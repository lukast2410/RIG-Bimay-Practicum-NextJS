import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DividerWithMessage from "../../home/DividerWithMessage";
import Loading from "../Loading";

export default function AnswerDescriptionLists({
  submittedAnswers,
  getFormattedDate,
}) {
  const [isLoading, setLoading] = useState([]);
  const [userData, setUserData] = useContext(UserContext);
  const oneDriveTokenUrl =
    "https://laboratory.binus.ac.id/lapi/api/Account/GetOneDriveToken";

  const setInitialLoading = () => {
    const initialLoadings = [];
    for(let i = 0; i < submittedAnswers.length; i++){
      initialLoadings[i] = false;
    }
    setLoading(initialLoadings);
  }  

  const getDownloadUrl = async (source, idx) => {
    setInitialLoading();

    isLoading[idx] = true;
    setLoading([...isLoading]);

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

    isLoading[idx] = false;
    setLoading([...isLoading]);
    window.location.href = fileFromUrl["@microsoft.graph.downloadUrl"];
  };

  return (
    <div className="mt-4 xl:hidden pb-2">
      {submittedAnswers.map((answer, idx) => (
        <div
          className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 rounded-md"
          key={idx}
        >
          <div className="px-3 py-3 sm:px-6 bg-binus-blue">
            <h3 className="text-lg leading-6 font-medium text-white">
              {answer.Type}-{answer.Number}
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {answer.StatusFile}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Uploaded By
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {answer.Uploader}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Uploaded Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {getFormattedDate(answer.UploadDate)}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Finalized By
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {answer.FinalizedBy == null ? "-" : answer.FinalizedBy}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Finalized Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {answer.FinalizedDate == null
                    ? "-"
                    : getFormattedDate(answer.FinalizedDate)}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Hash Code</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {answer.Hash}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  File Size (Bytes)
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {answer.TotalSize}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Action</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue"
                    onClick={() => getDownloadUrl(answer.Source, idx)}
                  >
                    {isLoading[idx] && <Loading color="text-binus-blue" />}
                    Download
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
