import { LocationMarkerIcon } from '@heroicons/react/solid'

const listShift = [
	{ id: 1, Name: '07:20 - 09:00' },
	{ id: 2, Name: '09:20 - 11:00' },
	{ id: 3, Name: '11:20 - 13:00' },
	{ id: 4, Name: '13:20 - 15:00' },
	{ id: 5, Name: '15:20 - 17:00' },
	{ id: 6, Name: '17:20 - 19:00' },
	{ id: 7, Name: '19:20 - 21:00' },
	{ id: 8, Name: '21:20 - 23:00' },
]

const formatDate = (date) => {
	let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	let day = date.getDate()

	let monthIndex = date.getMonth()
	let monthName = monthNames[monthIndex]

	let year = date.getFullYear()

	return `${day} ${monthName} ${year}`
}

export default function ExtraClassGrid({ key, extra }) {
	const course = extra.Course.split('-')
	const ast = extra.Assistant1 + (extra.Assistant2.length == 0 ? '' : ' & ' + extra.Assistant2)
  const date = formatDate(new Date(extra.ExtraClassDate))
	return (
		<div key={key} className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
			<div className='flex-shrink-0 bg-binus-blue text-white font-medium text-center py-2 px-4'>
				<p className='text-xl font-semibold'>{course[0]}</p>
				<p className='text-lg leading-tight border-b-2 border-white pb-1.5'>{course[1]}</p>
				<p className='text-base pt-1'>{ast}</p>
			</div>
			<div className='flex-1 bg-white pt-2 pb-4 px-4 flex flex-col justify-between'>
				<div className='flex-1'>
					<a href='' className='block'>
						<p className='text-lg font-semibold text-gray-900 overflow-ellipsis overflow-hidden whitespace-nowrap'>
							{extra.Topics}
						</p>
					</a>
				</div>
				<div className='mt-2 flex items-center text-gray-500 text-sm font-medium'>
					{listShift[extra.Shift - 1].Name}
				</div>
				<div className='mt-1 flex items-center text-gray-500 text-sm font-medium'>{date}</div>
				<div className='flex justify-between'>
					<div className='mt-1 flex items-center text-gray-500 text-sm font-medium'>
						<LocationMarkerIcon className='h-4 w-4 mr-1' />
						{extra.Room}
					</div>
					<div className='mt-1 flex items-center text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-700'>
						Read More
					</div>
				</div>
			</div>
		</div>
	)
}
