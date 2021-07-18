import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DividerWithMessage from "../../home/DividerWithMessage";
import Loading from "../Loading";
import Answer from "./Answer";
import AnswerDescriptionLists from "./AnswerDescriptionLists";

export default function SubmittedAnswer({ submittedAnswers }) {
  
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
                        <Answer answer={answer} idx={idx} />
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
