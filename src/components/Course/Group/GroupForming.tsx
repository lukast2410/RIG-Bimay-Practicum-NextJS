import axios from "axios";
import { useContext, useState } from "react";
import { ErrorModalProvider } from "../../../contexts/ErrorModalContext";
import { UserContext } from "../../../contexts/UserContext";
import GroupRegistration from "./GroupRegistration";

export default function GroupForming({groupProject, studentGroupDetail, groupConfirmation}){

    const [userData, setUserData] = useContext(UserContext)
    const [group, setGroup] = useState(groupProject);
    const [checkGroup, setCheckGroup] = useState(groupConfirmation);
    const [isAccLoading, setAccLoading] = useState(false);
    const [isDeclineLoading, setDeclineLoading] = useState(false);

    console.log(studentGroupDetail);

    const getGroupProject = async () => {
        const getGroupProjectUrl = 'https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetGroupConfirmation?classTransactionId=';
        const newGroupProject = await axios.get(`${getGroupProjectUrl}${studentGroupDetail.Group.ClassTransactionId}`, {
            headers: {
                authorization: `Bearer ${userData.Token.token}`
            }
        })
        .then(response => response.data);

        
        checkGroupConfirmation();
        setGroup(newGroupProject);
    }

    const finalizeConfirmation = async (isAccept) => {
        isAccept == true ? setAccLoading(true) : setDeclineLoading(true);
        const confirmationUrl = `https://laboratory.binus.ac.id/lapi/api/Binusmaya/FinalizeGroupConfirmation?isAccept=${isAccept}`
        const payload = {
            ClassTransactionId: studentGroupDetail.Group.ClassTransactionId,
            GroupNumber: group.GroupNumber,
            Status: group.Status,
            Students: group.Students
        }

        const responseData = await axios.post(confirmationUrl, payload, {
            headers: {
                authorization: `Bearer ${userData.Token.token}`
            }
        })
        .then(res => res.data);

        isAccept == true ? setAccLoading(false) : setDeclineLoading(false);
        getGroupProject();
    }

    const checkGroupConfirmation = async () => {
        const checkGroupUrl = `https://laboratory.binus.ac.id/lapi/api/Binusmaya/CheckGroupConfirmation?classTransactionId=${studentGroupDetail.Group.ClassTransactionId}`;

        const responseData = await axios.get(checkGroupUrl, {
            headers: {
                authorization: `Bearer ${userData.Token.token}`
            }
        })
        .then(res => res.data);

        setCheckGroup(responseData);
    }

    return(
        <ErrorModalProvider>
        <div className="rounded-md pb-4">
            {
                group.Students && 
                (
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">
                        Group Forming - Group {studentGroupDetail.Group.GroupNumber == "" ? group.GroupNumber : studentGroupDetail.Group.GroupNumber}
                    </h3>
                )
            }
            {
                group.Students == null ?
                (
                    <GroupRegistration studentGroupDetail={studentGroupDetail} getGroupProject={getGroupProject}/>
                )
                :
                (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-binus-blue">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            No
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            NIM
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        group.Students.map((student, idx) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {idx + 1}
                                                    </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {student.StudentNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.Name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.IsAccept == false ? 'Pending' : 'Accept'}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {
                    !checkGroup && 
                    (
                    <div className="mt-4 flex">
                        <button type="button" className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-binus-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0" onClick={() => finalizeConfirmation(true)}>
                        {
                            isAccLoading ?
                            (
                                <svg className="animate-spin h-5 w-5 -ml-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )
                            : <></>
                        }
                            Accept
                        </button>
                        <button type="button" className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3" onClick={() => finalizeConfirmation(false)}>
                        {
                            isDeclineLoading ?
                            (
                                <svg className="animate-spin h-5 w-5 -ml-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )
                            : <></>
                        }
                            Decline
                        </button>
                    </div>
                    )
                }
            </div>
                )
            }
        </div>
        </ErrorModalProvider>
    )
}