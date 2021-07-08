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
						<div className='flex items-center bg-gray-200 font-bold sm:text-lg px-4 py-2'>
							<FontAwesomeIcon icon={faVideoSlash} className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
							Please update the link record
						</div>

						<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-4 text-sm text-gray-500'>
							{noRecord.map((x, idx) => (
								<ExtraClassGrid key={idx} extra={x} />
							))}
						</div>
					</div>
				</div>
			)}
			<div className='max-w-screen-2xl mx-auto px-4 my-4 sm:px-6 sm:my-4 lg:px-8 lg:my-6'>
				<div className='rounded-lg bg-white shadow overflow-hidden'>
					<div className='bg-gray-200 font-bold sm:text-lg px-4 py-2'>
						<FontAwesomeIcon icon={faChalkboardTeacher} className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
						Your Extra Class Today
					</div>

					{today.length > 0 ? (
						<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-4 text-sm text-gray-500'>
							{today.map((x, idx) => (
								<ExtraClassGrid key={idx} extra={x} />
							))}
						</div>
					) : (
						<div className='text-center py-3'>
							<h3 className='sm:text-lg font-bold'>You have no event</h3>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
