import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExtraClassGrid from '../extraclass/ExtraClassGrid'

export default function RecentExtraClass({ classes }) {
	return (
		<div className='max-w-screen-2xl mx-auto px-4 mt-4 sm:px-6 sm:mt-6 lg:px-8 lg:mt-8'>
			<div className='rounded-lg bg-white shadow overflow-hidden'>
				<div className='bg-gray-200 font-bold sm:text-lg px-4 py-2'>
					<FontAwesomeIcon icon={faChalkboardTeacher} className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
					Your Extra Class
				</div>

				{classes.length > 0 ? (
					<div className='px-2 py-2 lg:px-4 lg:py-4 text-sm text-gray-500'>
						<ul className='divide-y divide-gray-300'>
							{classes.map((x, idx) => (
								<ExtraClassGrid key={idx} extra={x} />
							))}
						</ul>
					</div>
				) : (
					<div className='text-center py-3'>
						<h3 className='sm:text-lg font-bold'>- You have no extra class -</h3>
					</div>
				)}
			</div>
		</div>
	)
}
