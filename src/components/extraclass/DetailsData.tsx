import { RefreshIcon } from '@heroicons/react/solid'
import router from 'next/router'
import DividerWithMessage from '../home/DividerWithMessage'
import AttendanceList from './AttendanceList'

export default function DetailsData({ extra }) {
	return (
		<div id='attendance'>
			{extra.details.length > 0 ? (
				<>
					<div className='hidden md:block'>
						<div className='flex items-end justify-between px-1 pb-1.5'>
							<span className='text-base font-medium text-gray-500'>Attendance Informations</span>
							<button
								type='button'
								className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
								onClick={() => router.replace(router.asPath)}
							>
								<RefreshIcon className='-ml-1 mr-2 h-4 w-4' aria-hidden='true' />
								Refresh
							</button>
						</div>
						<div className='flex flex-col'>
							<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
								<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
									<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
										<table className='min-w-full table-fixed divide-y divide-gray-200'>
											<thead className='bg-binus-blue'>
												<tr>
													<th
														scope='col'
														className='w-8 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
													>
														No
													</th>
													<th
														scope='col'
														className='w-36 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
													>
														NIM
													</th>
													<th
														scope='col'
														className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
													>
														Name
													</th>
													<th
														scope='col'
														className='w-32 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider text-center'
													>
														Status
													</th>
													<th
														scope='col'
														className='w-32 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider text-center'
													>
														Class {extra.Class}
													</th>
												</tr>
											</thead>
											<tbody className='bg-white divide-y divide-gray-200'>
												{extra.details.map((x, idx) => (
													<tr key={idx}>
														<td className='px-6 py-4 whitespace-nowrap'>
															<div className='flex items-center justify-center'>
																<div className='text-sm text-gray-900'>{idx + 1}</div>
															</div>
														</td>
														<td className='px-6 py-4 whitespace-nowrap'>
															<div className='text-sm text-gray-900'>{x.StudentId}</div>
														</td>
														<td className='px-6 py-4'>
															<div className='text-sm text-gray-900 break-words'>{x.StudentName}</div>
														</td>
														<td className='px-6 py-4 whitespace-nowrap text-center'>
															<span
																className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
																	x.Status == 'Present'
																		? 'bg-green-100 text-green-800'
																		: 'bg-red-100 text-red-800'
																}`}
															>
																{x.Status}
															</span>
														</td>
														<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
															{x.InsideStudent ? 'Yes' : 'No'}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='block md:hidden'>
						<div className='rounded-lg bg-white shadow overflow-hidden'>
							<div className='flex items-center justify-between bg-blue-200 font-bold px-4 py-2'>
								<span>Attendance Informations</span>
								<button
									type='button'
									className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-800 bg-blue-100 hover:bg-blue-300 focus:outline-none'
									onClick={() => router.replace(router.asPath)}
								>
									Refresh
								</button>
							</div>
							<div className='px-2 py-2 lg:px-4 lg:py-4 text-sm text-gray-500'>
								<ul className='divide-y divide-gray-200'>
									{extra.details.map((x, idx) => (
										<AttendanceList key={idx} extraclass={extra.Class} detail={x} />
									))}
								</ul>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className='py-4 px-5 rounded-md bg-red-50'>
					<DividerWithMessage
						message='There is no attendance data.'
						bg='red-50'
						size='lg'
						mt=''
						color='red-800'
					/>
				</div>
			)}
		</div>
	)
}
