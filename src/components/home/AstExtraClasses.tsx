import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoSlash, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import ExtraClassGrid from '../extraclass/ExtraClassGrid'

export default function AstExtraClasses({ extra }) {
	const noRecord = extra.no_record
	const today = extra.today

	return (
		<>
			{noRecord.length > 0 && (
				<div className='max-w-screen-2xl mx-auto px-4 my-4 sm:px-6 sm:my-4 lg:px-8 lg:my-6'>
					<div className='rounded-lg bg-white shadow overflow-hidden'>
						<div className='flex items-center bg-blue-200 font-bold sm:text-lg px-4 py-2'>
							<FontAwesomeIcon icon={faVideoSlash} className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
							Please update the link record
						</div>

						<div className='px-2 py-2 lg:px-4 lg:py-4 text-sm text-gray-500'>
							<ul className="divide-y divide-gray-300">
								{noRecord.map((x, idx) => (
									<ExtraClassGrid key={idx} extra={x} />
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
			<div className='max-w-screen-2xl mx-auto px-4 my-4 sm:px-6 sm:my-4 lg:px-8 lg:my-6'>
				<div className='rounded-lg bg-white shadow overflow-hidden'>
					<div className='bg-blue-200 font-bold sm:text-lg px-4 py-2'>
						<FontAwesomeIcon icon={faChalkboardTeacher} className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
						Your Extra Class Today
					</div>

					{today.length > 0 ? (
						<div className='px-2 py-2 lg:px-4 lg:py-4 text-sm text-gray-500'>
							<ul className="divide-y divide-gray-300">
								{today.map((x, idx) => (
									<ExtraClassGrid key={idx} extra={x} />
								))}
							</ul>
						</div>
					) : (
						<div className='text-center py-3'>
							<h3 className='sm:text-lg font-bold'>- You have no extra class today -</h3>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
