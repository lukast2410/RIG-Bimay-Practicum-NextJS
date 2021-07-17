import { CalendarIcon, LocationMarkerIcon, UsersIcon, ChevronRightIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { formatDate, listShift } from '../../pages/api/helper'

export default function ExtraClassGrid({ extra }) {
	const course = extra.Course.split('-')
  const date = formatDate(new Date(extra.ExtraClassDate))

	return (
		<li>
			<Link href={`/extra-class/${extra.ExtraClassId}`}>
				<a className="block hover:bg-gray-100">
					<div className="px-3 py-3 sm:px-4 lg:py-4 lg:px-6">
						<div className="flex items-center justify-between relative">
							<div className='flex flex-col sm:flex-row'>
								<p className="text-sm font-bold text-blue-800 truncate">{course[0]}&nbsp;</p>
								<p className="text-sm font-medium text-blue-600 truncate">{course[1]}</p>
							</div>
							<div className="flex-shrink-0 flex absolute right-0 top-0">
								<p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
									{listShift[extra.Shift - 1].Name}
								</p>
							</div>
						</div>
						<div className='font-medium whitespace-nowrap overflow-hidden overflow-ellipsis max-w-sm'>
							{extra.Topics}
						</div>
						<div className="mt-2 sm:flex sm:justify-between">
							<div className="sm:flex">
								<div className="flex items-center text-sm text-gray-500">
									<UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
									<p className='px-2 text-xs leading-6 font-semibold rounded-full bg-blue-100 text-blue-800'>{extra.Assistant1}</p>
									{extra.Assistant2 != '' && (
										<p className='ml-2 px-2 text-xs leading-6 font-semibold rounded-full bg-blue-100 text-blue-800'>{extra.Assistant2}</p>
									)}
								</div>
								<div className='mt-2 flex items-center sm:mt-0 sm:ml-6'>
									<p className="flex items-center text-sm text-gray-500">
										<LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
										{extra.Room}
									</p>
								</div>
								<div className='mt-2 flex items-center sm:mt-0 sm:ml-6'>
									<p className="flex items-center text-sm text-gray-500">
										<DesktopComputerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
										{extra.Class}
									</p>
								</div>
							</div>
							<div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
								<CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
									{date}
							</div>
						</div>
					</div>
				</a>
			</Link>
		</li>
	)
}
