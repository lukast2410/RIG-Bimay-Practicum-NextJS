import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { DocumentTextIcon } from '@heroicons/react/outline'

export default function Procedures({procedures}) {
	return (
		<div className='max-w-screen-2xl mx-auto pb-6 px-4 my-4 sm:px-6 sm:my-6 lg:px-8 lg:my-8'>
			<div className='rounded-lg bg-white shadow overflow-hidden'>
				<div className='bg-gray-200 font-bold sm:text-lg px-4 py-2'>
					<FontAwesomeIcon icon={faClipboardList} className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
					Procedure & Rules
				</div>

				{procedures.length == 0 ? (
					<div className='text-center py-3'>
						<h3 className='sm:text-lg font-bold'>- You have no event -</h3>
					</div>
				) : (
					<div className='rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px'>
						{procedures.map((procedure, idx) => (
							<div key={idx} className='relative group bg-white p-3 flex'>
								<div>
									<span className='text-blue-700 bg-blue-50 rounded-lg inline-flex p-2 sm:p-3 ring-4 ring-white'>
										<DocumentTextIcon className='h-4 w-4 sm:h-6 sm:w-6' aria-hidden='true' />
									</span>
								</div>
								<div className='ml-3 mr-10 flex items-center'>
									<h3 className='text-sm sm:text-base font-medium'>
										<a
											href={`${process.env.NEXT_PUBLIC_BLUEJACK_URL}Laboratory/GetFileNotice/${procedure.FileId}/${procedure.Title}.pdf`}
											target='#'
											className='focus:outline-none'
										>
											<span className='absolute inset-0' aria-hidden='true' />
											{procedure.Title}
										</a>
									</h3>
								</div>
								<span
									className='pointer-events-none absolute top-5 right-5 text-gray-300 group-hover:text-blue-500'
									aria-hidden='true'
								>
									<svg
										className='h-6 w-6'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z' />
									</svg>
								</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
