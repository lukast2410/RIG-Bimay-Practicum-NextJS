import {
	CalendarIcon,
	LocationMarkerIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/solid'
import router from 'next/router'
import { formatDate, listShift } from '../../pages/api/helper'

export default function ExtraClassHeader({ extra, isOwner, setOpen }) {
	const course = extra.Course.split('-')
	const date = formatDate(new Date(extra.ExtraClassDate))
	const handleEdit = () => {
		router.push('/extra-class/update/' + extra.ExtraClassId)
	}
	return (
		<header className='bg-gray-100 py-8'>
			<div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between'>
				<div className='flex-1 min-w-0'>
					<h1 className='flex items-start flex-col sm:flex-row sm:items-center mt-2 text-2xl font-bold leading-7 sm:leading-10 text-gray-900 sm:text-3xl sm:truncate'>
						<p className='text-blue-800'>{course[0]}&nbsp;</p>
						<p className='text-blue-600'>{course[1]}</p>
					</h1>
					<div className='mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8'>
						<div className='mt-2 flex items-center text-sm text-gray-500'>
							<LocationMarkerIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
							{extra.Room}
						</div>
						<div className='mt-2 flex items-center text-sm text-gray-500'>
							<CalendarIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
							{date}
						</div>
						<div className='flex-shrink-0 flex pt-1.5 mt-1'>
							<p className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
								{listShift[extra.Shift - 1].Name}
							</p>
						</div>
					</div>
				</div>
				{isOwner ? (
					<div className='mt-5 flex xl:mt-0 xl:ml-4'>
						<span className='block'>
							<button
								type='button'
								className='inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500'
								onClick={() => handleEdit()}
							>
								<PencilIcon className='-ml-1 mr-2 h-5 w-5 text-white' aria-hidden='true' />
								Edit
							</button>
						</span>

						<span className='block ml-3'>
							<button
								type='button'
								className='inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500'
								onClick={() => setOpen(true)}
							>
								<TrashIcon className='-ml-1 mr-2 h-5 w-5 text-white' aria-hidden='true' />
								Delete
							</button>
						</span>
					</div>
				) : null}
			</div>
		</header>
	)
}
