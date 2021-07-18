import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DividerWithMessage from "../../home/DividerWithMessage";
import Note from "../Note";
import { v1 as uuidv1 } from "uuid";
import Loading from "../Loading";
import { ModalContext } from "../../../contexts/ModalContext";
import Modal from "../Modal";
import SubmissionDescriptionLists from "./SubmissionDescriptionLists";
import LoadingProgressBar from "../LoadingProgressBar";

export default function CaseSubmissionComponent({
  onlineTasks,
  classTransactionId,
  courseCode,
  studentGroupDetail,
}) {
  const [userData, setUserData] = useContext(UserContext);
  const [counter, setCounter] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [totalCounter, setTotalCounter] = useState(1);
  const [modal, setModal] = useContext(ModalContext);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loadingProgressBar, setLoadingProgressBar] = useState(false);

  const semester = userData?.Semesters.find(
    (s) => s.SemesterId === userData.SemesterId
  );
  const semesterName = semester?.Description.replace("/", "-");

  const getCurrentTimeUrl =
    "https://laboratory.binus.ac.id/lapi/api/general/time";
  const oneDriveTokenUrl =
    "https://laboratory.binus.ac.id/lapi/api/Account/GetOneDriveToken";
  const uploadUrl = "https://laboratory.binus.ac.id/lapi/api/binusmaya/file";

  const uploadAnswer = async (event) => {
    setLoading(true);
    setLoadingProgressBar(true);

    const currentTime = await axios
      .get(getCurrentTimeUrl)
      .then((res) => res.data);

    if (
      new Date(currentTime).getTime() >
      new Date(onlineTasks[0].Deadline).getTime()
    ) {
      setLoading(false);
      setLoadingProgressBar(false);
      setModal({
        show: true,
        message: "Cannot upload the answer! Already passed the deadline!",
        error: true,
      });
      return;
    }

    const { token } = await axios
      .get(oneDriveTokenUrl, {
        headers: {
          authorization: `Bearer ${userData.Token.token}`,
        },
      })
      .then((res) => res.data);

    const path = `/lab/${semesterName}/Project/${courseCode}/${onlineTasks[0].ClassName.replace(
      " ",
      ""
    )}/${userData.Data.UserName}`;

    const file = event.target.files[0];
    const fileName = file.name.split(".")[0];
    const fileExt = file.name.split(".")[1];

    const options = {
      path,
      fileName: `${fileName}_${uuidv1()}.${fileExt}`,
      rangeSize: 10 * 1024 * 1024,
    };

    setTotalCounter(Math.ceil(file.size / options.rangeSize));

    const urlGraph = `https://graph.microsoft.com/v1.0/me/drive/root:${options.path}/${options.fileName}:/createUploadSession`;

    const payload = {
      item: {
        "@microsoft.graph.conflictBehavior": "replace",
        "@odata.type": "microsoft.graph.driveItemUploadableProperties",
        name: fileName,
      },
    };

    const urlGraphResponse = await axios
      .put(urlGraph, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

    const minBytes = 0,
      maxBytes = options.rangeSize - 1;

    const res = await uploadBytes(
      token,
      urlGraphResponse.uploadUrl,
      file,
      minBytes,
      maxBytes,
      options.rangeSize
    );

    const Url = res.downloadURL;
    const lastModifiedDateTime = res.lastModifiedDateTime;
    const hash = res.hash;
    const size = file.size;
    const resFileName = res.fileName;
    const type = "Project";

    const uploadPayload = {
      Type: type,
      Number: onlineTasks[0].Number,
      Url,
      Hash: hash,
      FileName: resFileName,
      Size: size,
      DateModified: lastModifiedDateTime,
      UploadTime: currentTime,
      ClassTransactionId: classTransactionId,
    };

    await axios
      .post(uploadUrl, uploadPayload, {
        headers: {
          authorization: `Bearer ${userData.Token.token}`,
        },
      })
      .then((res) => res.data);

    setLoading(false);
    setLoadingProgressBar(false);
    setUploadPercentage(0);

    setModal({
      show: true,
      message: "Successfully uploaded your answer!",
      error: false,
    });
  };

  const uploadBytes = async (
    token,
    uploadUrl,
    file,
    minBytes,
    maxBytes,
    range
  ) => {
    let count = 1;
    let totalCount = Math.ceil(file.size / range);

    while (true) {
      if (maxBytes >= file.size) maxBytes = file.size;

      const fileBlob = file.slice(minBytes, maxBytes);

      const response = await axios
        .put(uploadUrl, fileBlob, {
          headers: {
            "Content-Range": `bytes ${minBytes}-${maxBytes - 1}/${file.size}`,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadPercentage(percentCompleted);
          },
        })
        .then((res) => res.data);

      if (response["nextExpectedRanges"] !== undefined) {
        minBytes = maxBytes;
        maxBytes = minBytes + range;
      }

      if (count < totalCount) {
        count++;
        setCounter(count);
      }

      if (response["id"] !== undefined) {
        const fileId = response["id"];
        const downloadURL = `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`;
        const lastModifiedDateTime = response["lastModifiedDateTime"];
        const hash = response["file"]["hashes"]["quickXorHash"];
        const fileName = response["name"];
        return {
          downloadURL,
          lastModifiedDateTime,
          hash,
          fileName,
        };
      }
    }
  };

  const renderOnlineTasks = () => {
    if (studentGroupDetail.Group == null) {
      return (
        <div className="py-4 px-5 rounded-md bg-red-50">
          <DividerWithMessage
            message="There is no available Online Task for this subject."
            bg="red-50"
            size="lg"
            mt=""
            color="red-800"
          />
        </div>
      );
    } else if (studentGroupDetail.Group.Id == null) {
      return (
        <Note message="To download project case, you must form a group first." />
      );
    }

    return (
      <div>
        <LoadingProgressBar
          loadingProgressBar={loadingProgressBar}
          setLoadingProgressBar={setLoadingProgressBar}
          uploadPercentage={uploadPercentage}
          counter={counter}
          totalCounter={totalCounter}
        />
        <SubmissionDescriptionLists
          onlineTasks={onlineTasks}
          classTransactionId={classTransactionId}
          uploadAnswer={uploadAnswer}
          loading={isLoading}
          setLoading={setLoading}
        />
        <div className="xl:block hidden">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-binus-blue">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Deadline
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Hash Code
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          File Size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Uploaded Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Case
                        </th>
                        {onlineTasks[0].CanUpload && (
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Action
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {onlineTasks.map((task, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {task.Type}-{task.Number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {task.Deadline}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {task.Hash}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {task.Size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {task.UploadTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                            <Link
                              href={`https://bluejack.binus.ac.id/binusmayalab/Laboratory/GetTaskFile/${task.SemesterId}/${task.CourseOutlineId}/${classTransactionId}/Project/1`}
                            >
                              <button
                                type="button"
                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue"
                              >
                                Download
                              </button>
                            </Link>
                          </td>
                          {task.CanUpload && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                              <label htmlFor="upload">
                                <div className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue cursor-pointer">
                                  {isLoading && (
                                    <Loading color="text-binus-blue" />
                                  )}
                                  Upload
                                </div>
                              </label>
                              <input
                                type="file"
                                name="upload"
                                id="upload"
                                className="hidden"
                                onChange={uploadAnswer}
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">
        Case & Submission
      </h3>
      {renderOnlineTasks()}
      <Modal />
    </div>
  );
}
