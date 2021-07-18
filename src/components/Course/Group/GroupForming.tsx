import axios from "axios";
import { useContext, useState } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { UserContext } from "../../../contexts/UserContext";
import Loading from "../Loading";
import Modal from "../Modal";
import Note from "../Note";
import GroupRegistration from "./GroupRegistration";
import { useRouter } from "next/router";

export default function GroupForming({
  groupProject,
  studentGroupDetail,
  groupConfirmation,
}) {
  
  const [userData, setUserData] = useContext(UserContext);
  const [group, setGroup] = useState(groupProject);
  const [checkGroup, setCheckGroup] = useState(groupConfirmation);
  const [isAccLoading, setAccLoading] = useState(false);
  const [isDeclineLoading, setDeclineLoading] = useState(false);
  const [modal, setModal] = useContext(ModalContext);
  const router = useRouter();

  const getGroupProject = async () => {
    const getGroupProjectUrl =
      `${process.env.NEXT_PUBLIC_LABORATORY_URL}Binusmaya/GetGroupConfirmation?classTransactionId=`;
    const newGroupProject = await axios
      .get(
        `${getGroupProjectUrl}${studentGroupDetail.Group.ClassTransactionId}`,
        {
          headers: {
            authorization: `Bearer ${userData.Token.token}`,
          },
        }
      )
      .then((response) => response.data);

    checkGroupConfirmation();
    setGroup(newGroupProject);
  };

  const finalizeConfirmation = async (isAccept) => {
    isAccept == true ? setAccLoading(true) : setDeclineLoading(true);

    const confirmationUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Binusmaya/FinalizeGroupConfirmation?isAccept=${isAccept}`;
    const payload = {
      ClassTransactionId: studentGroupDetail.Group.ClassTransactionId,
      GroupNumber: group.GroupNumber,
      Status: group.Status,
      Students: group.Students,
    };

    await axios
      .post(confirmationUrl, payload, {
        headers: {
          authorization: `Bearer ${userData.Token.token}`,
        },
      })
      .then((res) => res.data);

    if (isAccept) {
      setAccLoading(false);
      setNotification("Successfully accepted the group!");
    } else {
      setDeclineLoading(false);
      setNotification("Successfully rejected the group!");
    }

    getGroupProject();
  };

  const setNotification = (message) => {
    setModal({
      show: true,
      message: message,
      error: false,
    });
  };

  const checkGroupConfirmation = async () => {
    const checkGroupUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Binusmaya/CheckGroupConfirmation?classTransactionId=${studentGroupDetail.Group.ClassTransactionId}`;

    const responseData = await axios
      .get(checkGroupUrl, {
        headers: {
          authorization: `Bearer ${userData.Token.token}`,
        },
      })
      .then((res) => res.data);

    setCheckGroup(responseData);
  };

  const renderCheckGroupConfirmation = () => {
    if (!checkGroup) {
      return (
        <div className="mt-4 xl:mt-2 flex items-center flex-col sm:flex-row md:justify-between">
          <Note message="If the formed group does not match the one you selected, please press the reject button." />
          <div className="mt-4 flex sm:mt-0 justify-between justify-between sm:justify-start sm:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mx-2 sm:mx-0 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-binus-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue sm:order-0 sm:ml-0 transform hover:scale-110 transition ease-out duration-300"
              onClick={() => finalizeConfirmation(true)}
            >
              {isAccLoading ? <Loading color="text-white" /> : <></>}
              Accept
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mx-2 sm:mx-0 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 sm:order-1 sm:ml-3 transform hover:scale-110 transition ease-out duration-300"
              onClick={() => finalizeConfirmation(false)}
            >
              {isDeclineLoading ? <Loading color="text-white" /> : <></>}
              Decline
            </button>
          </div>
        </div>
      );
    }

    if (!studentGroupDetail.Group.Id) {
      return (
        <div className="mt-4 xl:mt-2">
          <Note message="Please wait for all students accept the confirmation." />
        </div>
      );
    }
  };

  return (
    <div>
      <Modal />
      <div className="rounded-md pb-4">
        {group.Students && (
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">
            {studentGroupDetail.Group.GroupNumber == ""
              ? "Group Forming Confirmation"
              : `Group Forming - Group ${studentGroupDetail.Group.GroupNumber}`}
          </h3>
        )}
        {group.Students == null && studentGroupDetail.Group.Id == null ? (
          <GroupRegistration
            studentGroupDetail={studentGroupDetail}
            getGroupProject={getGroupProject}
          />
        ) : (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-binus-blue">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          NIM
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Name
                        </th>
                        {!studentGroupDetail.Group.Id && (
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Status
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {studentGroupDetail.Group.Id != null
                        ? studentGroupDetail.Group.Students.map(
                            (student, idx) => (
                              <tr
                                key={idx}
                                className={
                                  idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {idx + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {student.StudentNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {student.Name}
                                </td>
                              </tr>
                            )
                          )
                        : group.Students.map((student, idx) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {idx + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {student.StudentNumber}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {student.Name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {student.IsAccept == false
                                  ? "Pending"
                                  : "Accept"}
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {renderCheckGroupConfirmation()}
            {studentGroupDetail.Group.Id != null ? (
              <div className="mt-4 font-medium text-sm">
                <div className="flex justify-between flex-col md:flex-row">
                  <p className="mb-2">
                    Group ID : {studentGroupDetail.Group.Id}
                  </p>
                  <p className="mb-2">{studentGroupDetail.Group.Status}</p>
                </div>
                <Note message={"default"} />
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
