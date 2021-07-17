import { formatDate, formatNumber } from "../../pages/api/helper"

export default function PracticumSchedule({ practicum }) {
  const status = practicum.AttendanceStatus
  const date = new Date(practicum.AttendanceTime)

	return (
		<div className='sm:-mt-1'>
			<div className='practicum-subject'>
				<dl className='mt-5 grid grid-cols-1 bg-white overflow-hidden rounded-lg border border-2 border-gray-500 divide-y divide-gray-500 md:grid-cols-3 md:divide-y-0 md:divide-x'>
					<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
						<dt className='text-medium sm:text-lg font-bold text-gray-600'>Subject</dt>
						<dd className='sm:mt-1'>
							<div className='sm:text-lg font-semibold text-black'>
								{practicum.Subject}
							</div>
						</dd>
					</div>
					<dl className='grid grid-cols-2 divide-x divide-gray-500'>
						<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
							<dt className='text-medium sm:text-lg font-bold text-gray-600'>Status</dt>
							<dd className='sm:mt-1'>
								<div className={`sm:text-lg font-bold ${status.toUpperCase() == 'PRESENT' ? 'text-green-600' : status.toUpperCase() == 'LATE' ? 'text-blue-600' : 'text-red-600'}`}>
									{status}
								</div>
							</dd>
						</div>
						<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
							<dt className='text-medium sm:text-lg font-bold text-gray-600'>Room</dt>
							<dd className='sm:mt-1'>
								<div className='sm:text-lg font-semibold text-black'>
									{practicum.AttendancePlace}
								</div>
							</dd>
						</div>
					</dl>
					<dl className='grid grid-cols-2 divide-x divide-gray-500'>
						<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
							<dt className='text-medium sm:text-lg font-bold text-gray-600'>Attend Date</dt>
							<dd className='sm:mt-1'>
								<div className='sm:text-lg font-semibold text-black'>
									{formatDate(date)}
								</div>
							</dd>
						</div>
						<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
							<dt className='text-medium sm:text-lg font-bold text-gray-600'>Attend Time</dt>
							<dd className='sm:mt-1'>
								<div className='sm:text-lg font-semibold text-black'>
									{`${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`}
								</div>
							</dd>
						</div>
					</dl>
				</dl>
			</div>
		</div>
	)
}
