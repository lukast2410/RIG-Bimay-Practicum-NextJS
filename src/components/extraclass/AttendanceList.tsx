import Link from "next/link";
import { listShift } from "../../pages/api/helper";

export default function AttendanceList({ extraclass, detail }) {
  const studentClass = detail.InsideStudent ? 'From Class ' + extraclass : 'From Other Class'
  return (
    <li>
				<div className="block">
					<div className="px-3 py-3 sm:px-4 lg:py-4 lg:px-6">
						<div className="flex items-center justify-between relative">
							<div className='flex flex-col'>
								<p className="text-sm font-bold text-blue-800 truncate">{detail.StudentId}</p>
							</div>
							<div className="flex-shrink-0 flex absolute right-0 top-0">
								<p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${detail.Status == 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
									{detail.Status}
								</p>
							</div>
						</div>
						<div className="mt-1 sm:flex sm:justify-between">
							<div className="sm:flex">
								<div className='mt-1 flex items-center sm:mt-0'>
									<p className="flex items-center font-medium text-sm text-gray-500">
										{detail.StudentName}
									</p>
								</div>
							</div>
							<div className="mt-1 flex items-center text-sm text-gray-500 sm:mt-0">
								{studentClass}
							</div>
						</div>
					</div>
				</div>
		</li>
  )
};
