import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DividerWithMessage from "../../home/DividerWithMessage";
import Loading from "../Loading";
import AnswerDescriptionLists from "./AnswerDescriptionLists";

export default function SubmittedAnswer({ submittedAnswers }) {
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useContext(UserContext);
  const oneDriveTokenUrl =
    "https://laboratory.binus.ac.id/lapi/api/Account/GetOneDriveToken";

  const getFormattedDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "Mei",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(date);
    let minutes;
    let seconds;
    let hours;

    d.getHours().toString().length == 1
      ? (hours = "0" + d.getHours())
      : (hours = d.getHours());
    d.getMinutes().toString().length == 1
      ? (minutes = "0" + d.getMinutes())
      : (minutes = d.getMinutes());
    d.getSeconds().toString().length == 1
      ? (seconds = "0" + d.getSeconds())
      : (seconds = d.getSeconds());

    return `${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}, ${hours}:${minutes}:${seconds}`;
  };

  const getDownloadUrl = async (source) => {
    setLoading(true);

    const { token } = await axios
      .get(oneDriveTokenUrl, {
        headers: {
          authorization: `Bearer ${userData.Token.token}`,
        },
      })
      .then((res) => res.data);

    const fileFromUrl = await axios
      .get(source, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

    setLoading(false);
    window.location.href = fileFromUrl["@microsoft.graph.downloadUrl"];
  };

  return (
    <div className="mt-4 pb-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">
        Submitted Answer
      </h3>
      {submittedAnswers.length == 0 ? (
        <div className="py-4 px-5 rounded-md bg-red-50">
          <DividerWithMessage
            message="There is no submitted answer for this subject"
            bg="red-50"
            size="lg"
            mt=""
            color="red-800"
          />
        </div>
      ) : (
        <div>
          <AnswerDescriptionLists submittedAnswers={submittedAnswers} />
          <div className="hidden xl:block flex flex-col">
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
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Uploaded By
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Uploaded Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Finalized By
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Finalized Date
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
                          File Size (Bytes)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedAnswers.map((answer, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {answer.Type}-{answer.Number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {answer.StatusFile}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {answer.Uploader}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 ">
                            {getFormattedDate(answer.UploadDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {answer.FinalizedBy == null
                              ? "-"
                              : answer.FinalizedBy}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {answer.FinalizedDate == null
                              ? "-"
                              : getFormattedDate(answer.FinalizedDate)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {answer.Hash}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {answer.TotalSize}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                            <button
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => getDownloadUrl(answer.Source)}
                            >
                              {
                                isLoading && 
                                (
                                  <Loading color="text-binus-blue" />
                                )
                              }
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
