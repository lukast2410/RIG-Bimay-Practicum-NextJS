/* This example requires Tailwind CSS v2.0+ */
import Link from "next/link";
import { useState } from "react";
import DividerWithMessage from "../../home/DividerWithMessage";
import Loading from "../Loading";

export default function SubmissionDescriptionLists({
  onlineTasks,
  classTransactionId,
  uploadAnswer,
  loading,
  setLoading
}) {

  return (
    <div className="mt-4 xl:hidden pb-2">
      {onlineTasks.map((task, idx) => (
        <div
          className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 rounded-md"
          key={idx}
        >
          <div className="px-3 py-3 sm:px-6 bg-binus-blue">
            <h3 className="text-lg leading-6 font-medium text-white">
              {task.Type}-{task.Number}
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Deadline</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {task.Deadline}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Hash Code</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {task.Hash == "" ? '-' : task.Hash}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Uploaded Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {task.UploadTime == "" ? '-' : task.UploadTime}
                </dd>
              </div>
              <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Case</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
                </dd>
              </div>
              {task.CanUpload && (
                <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Action</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <label htmlFor="upload">
                      <div className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue cursor-pointer">
                        {loading && <Loading color="text-binus-blue" />}
                        Upload
                      </div>
                    </label>
                    <input
                      type="file"
                      name="upload"
                      id="upload"
                      className="hidden"
                      onChange={(e) => uploadAnswer(e, setLoading)}
                    />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
