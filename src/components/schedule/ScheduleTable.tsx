import { useContext, useEffect, useState } from 'react'
import { VideoCameraIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function ScheduleTable({ schedule }) {
	const getFormattedDate = (date: string) => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const d = new Date(date)
		return `${days[d.getDay()]}, ${d.getDate()} ${d.toString().split(' ')[1]} ${d.getFullYear()}`
	}

	const [sortedSchedule, setSortedSchedule] = useState(schedule)

	const sortScheduleByName = () => {
		schedule.sort((item1, item2) => {
			const a = item1.CourseName.split('-')
			const b = item2.CourseName.split('-')
			if (a[1] < b[1]) return -1
			else if (a[1] > b[1]) return 1
			return 0
		})
		setSortedSchedule([...schedule])
	}

	const sortScheduleByDate = () => {
		schedule.sort((item1, item2) => {
			const a = new Date(item1.Date)
			const b = new Date(item2.Date)
			const c = item1.Time.substring(0, 5).split(':')
			const d = item2.Time.substring(0, 5).split(':')

			var parsedHour: number = +c[0]
			var parsedMinute: number = +c[1]
			a.setHours(parsedHour)
			a.setMinutes(parsedMinute)

			parsedHour = +d[0]
			parsedMinute = +d[1]
			a.setHours(parsedHour)
			a.setMinutes(parsedMinute)

			return a.getTime() - b.getTime()
		})
		setSortedSchedule([...schedule])
	}

	const sortScheduleBySession = () => {
		schedule.sort((item1, item2) => {
			const a = item1.Session
			const b = item2.Session
			return a - b
		})

		setSortedSchedule([...schedule])
	}

	return (
		<>
			{!sortedSchedule.length ? (
				<div className='overflow-hidden rounded-lg max-w-screen-2xl mx-auto mt-4'>
					<div className='px-4'>
						<div className='w-full bg-blue-200 text-center rounded-lg px-4 py-10 mt-4'>
							<h1 className='text-blue-800 text-base sm:text-2xl font-bold'>
								There are no available schedule yet
							</h1>
							<p className='text-blue-700 text-sm sm:text-base font-medium'>
								Remember to keep checking this page frequently, thank you.
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className='max-w-screen-lg mx-auto flex items-center'>
					<div className='mx-auto flex flex-col py-4 w-full'>
						<div className='-my-2 overflow-x-auto'>
							<div className='py-2 align-middle inline-block px-4 w-full'>
								<div className='align-middle flex justify-center'>
									<div className='flex items-center m-2'>
										<span className='h-4 w-4 bg-blue-400 inline-block rounded-full'></span>
										<span className='whitespace-nowrap text-center m-1 text-xs text-gray-500'>
											: Normal Class
										</span>
									</div>
									<div className='flex items-center m-2'>
										<span className='h-4 w-4 bg-red-500 inline-block rounded-full'></span>
										<span className='whitespace-nowrap text-center m-1 text-xs text-gray-500'>: Quiz</span>
									</div>
									<div className='flex items-center m-2'>
										<span className='h-4 w-4 bg-green-400 inline-block rounded-full'></span>
										<span className='whitespace-nowrap text-center m-1 text-xs text-gray-500'>: Project</span>
									</div>
								</div>
								<div className='overflow-hidden border-2 border-gray-200 rounded-lg w-full'>
									<table className='min-w-full divide-y divide-gray-200'>
										<thead className='bg-gray-50'>
											<tr>
												<th scope='col'>
													<div className='px-1 py-3 m-0'></div>
												</th>
												<th scope='col'>
													<div
														onClick={sortScheduleByName}
														className='font-bold py-3 px-1 lg:px-6 text-xs font-medium text-gray-900 uppercase tracking-wider text-center hover:text-binus-blue cursor-pointer'
													>
														Course Name
													</div>
												</th>
												<th scope='col'>
													<div
														onClick={sortScheduleByDate}
														className='font-bold py-3 px-1 lg:px-6 text-xs font-medium text-gray-900 uppercase tracking-wider text-center hover:text-binus-blue cursor-pointer'
													>
														Date & Time
													</div>
												</th>
												<th
													scope='col'
													className='font-bold py-3 px-1 lg:px-6 text-xs font-medium text-gray-900 uppercase tracking-wider text-center'
												>
													Class
												</th>
												<th
													scope='col'
													className='font-bold py-3 px-1 lg:px-6 text-xs font-medium text-gray-900 uppercase tracking-wider text-center'
												>
													Room
												</th>
												<th scope='col'>
													<div
														onClick={sortScheduleBySession}
														className='font-bold py-3 px-1 lg:px-6 text-xs font-medium text-gray-900 uppercase tracking-wider text-center hover:text-binus-blue cursor-pointer'
													>
														Session
													</div>
												</th>
												<th
													scope='col'
													className='font-bold py-3 px-1 lg:px-6 text-xs font-medium text-gray-900 uppercase tracking-wider text-center'
												>
													Meeting URL
												</th>
											</tr>
										</thead>
										<tbody className='bg-white divide-y divide-gray-200'>
											{sortedSchedule.map((x, idx: number) => (
												<tr key={`scheduleTable ${idx}`}>
													{x.SessionTopic === 'Quiz' ? (
														<td className='bg-red-500 py-3 p-0 m-0'></td>
													) : x.SessionTopic === 'Project' ? (
														<td className='bg-green-400 py-3 p-0 m-0'></td>
													) : (
														<td className='bg-blue-400 py-3 p-0 m-0'></td>
													)}
													<td className='py-3 px-1 lg:px-6 text-xs text-gray-500 text-center'>
														{x.CourseName}
													</td>
													<td className='py-3 px-1 lg:px-6 whitespace-nowrap text-xs text-gray-500 text-center'>
														{getFormattedDate(x.Date)} <br />
														{x.Time}
													</td>
													<td className='py-3 px-1 lg:px-6 whitespace-nowrap text-xs text-gray-500 text-center'>
														{x.Class}
													</td>
													<td className='py-3 px-1 lg:px-6 whitespace-nowrap text-xs text-gray-500 text-center'>
														{x.Room === '' ? '-' : x.Room}
													</td>
													<td className='py-3 px-1 lg:px-6 whitespace-nowrap text-xs text-gray-500 text-center'>
														{x.Session}
													</td>
													<td className='py-3 px-1 lg:px-6 whitespace-nowrap text-xs text-gray-500 text-center'>
														{
															<Link href={x.URL}>
																<a
																	type='button'
																	className='inline-flex items-center p-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600'
																	target='_blank'
																>
																	<VideoCameraIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
																	Join Meeting
																</a>
															</Link>
														}
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
			)}
		</>
	)
}
