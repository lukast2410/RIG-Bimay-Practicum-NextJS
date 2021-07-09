import Link from 'next/link';
import DividerWithMessage from '../../home/DividerWithMessage';
import Note from '../Note';

export default function CaseSubmissionComponent({onlineTasks, classTransactionId}){

    return(
    <div className="rounded-md xl:block hidden">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">
            Case & Submission
        </h3>
        {
            onlineTasks.length == 0 ?
            (
                <div className='py-4 px-5 rounded-md bg-red-50'>
                    <DividerWithMessage message='There is no available Online Task for this subject.' bg='red-50' size='lg' mt='' color='red-800'/>
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {task.Deadline}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {task.Hash}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.Size}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.UploadTime}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                                        <Link href={`https://bluejack.binus.ac.id/binusmayalab/Laboratory/GetTaskFile/${task.SemesterId}/${task.CourseOutlineId}/${classTransactionId}/Project/1`}>
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
                    <Note message="To download project case, you must form a group first." />
                </div>
            )
        }
    </div>
    )
}