import Link from 'next/link';
import DividerWithMessage from '../../home/DividerWithMessage';

export default function CaseSubmissionComponent({onlineTasks, submittedAnswers}){

    return(
    <div className="rounded-md xl:block hidden">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">
            Case & Submission
        </h3>
        {
            onlineTasks.length == 0 ?
            (
                <div className='py-4 px-5 rounded-md bg-red-50'>
                    <DividerWithMessage message='There is no submission' bg='red-50' size='lg' mt='' color='red-800'/>
                </div>
            )
            :

            (
                <div>
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-binus-blue">
                                            <tr>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Deadline
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Hash Code
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    File Size
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Uploaded Time
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Case
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                onlineTasks.map((task, idx) => (
                                                <tr key={idx} className={idx % 2===0 ? 'bg-white' : 'bg-gray-100' }>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {task.Type}-{task.Number}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {task.Deadline}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {task.Hash}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.Size}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.UploadTime}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                                        <Link href="#">
                                                        <button type="button"
                                                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                            Download
                                                        </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md bg-yellow-50 p-4 mt-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                    Note
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        To download project case, you must form a group first.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
    )
}