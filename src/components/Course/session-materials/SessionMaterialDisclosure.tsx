import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function SessionMaterialDisclosure({
  sessionDetail,
  classTransactionId,
}) {
  const getFormattedDate = (date: string) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(date);
    return `${days[d.getDay()]}, ${d.getDate()} ${
      d.toString().split(" ")[1]
    } ${d.getFullYear()}`;
  };

  return (
    <div className="w-full lg:hidden pb-4">
      {sessionDetail.map((material, idx) => (
        <div className="w-full bg-white shadow-md rounded-md" key={idx}>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full p-4 text-sm font-medium text-left text-white bg-binus-blue focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 border-b">
                  <span>Session - {material.Session}</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-white`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm text-gray-500">
                  <div className="px-4 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {getFormattedDate(material.Date)}
                        </dd>
                      </div>
                      <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Topics
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {material.Topic}
                          <ul className="divide-y divide-gray-200 list-disc">
                            {material.SubTopics.map((m, idx) => (
                              <li className="py-4 flex" key={idx}>
                                <div className="ml-3">
                                  <p className="text-sm text-gray-900">
                                    {m.Value}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Room
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {material.Room === "" ? "-" : material.Room}
                        </dd>
                      </div>
                      <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Shift
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {material.Shift}
                        </dd>
                      </div>
                      <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 pb-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Practicum Case
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {material.CaseId ==
                          "00000000-0000-0000-0000-000000000000" ? (
                            <p>No File</p>
                          ) : (
                            <Link
                              href={`https://bluejack.binus.ac.id/binusmayalab/Laboratory/GetCase/${classTransactionId}/${material.Session}/${material.CaseId}`}
                            >
                              <button
                                type="button"
                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue"
                              >
                                Download Case
                              </button>
                            </Link>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
}
