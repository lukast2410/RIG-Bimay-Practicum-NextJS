import React, { useContext, useEffect, useState } from 'react'
import withSession from '../lib/session'
import { UserContext } from '../contexts/UserContext'
import Layout from '../components/Layout'
import Procedures from '../components/home/Procedures'
import Events from '../components/home/Events'
import DividerWithMessage from '../components/home/DividerWithMessage'
import Identity from '../components/home/Identity'
import RandomQuotes from '../components/home/RandomQuotes'
import AstExtraClasses from '../components/home/AstExtraClasses'
import axios from 'axios'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Home({ user, procedures, events, extra }) {
	const [userData, setUserData] = useContext(UserContext)
	console.log(extra)
	useEffect(() => setUserData(user), [user])

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	const isStudent = user?.Data.Role != 'Software Teaching Assistant'
	const [practicum, setPracticum] = useState(false)
	const steps = [
		{
			id: '01',
			name: 'Download Case',
			description: ['You can download your exam case here.'],
			href: '#',
			status: 'link',
		},
		{
			id: '02',
			name: 'Extract Case File',
			description: [
				'After download your exam case, please extract (.zip) file to access the exam case.',
				'View the step here.',
			],
			href: '#',
			status: 'link',
		},
		{
			id: '03',
			name: 'Compress Your Answer',
			description: [
				'Make sure you have saved your answers to D: Drive.',
				'If you have finished your case, close all programs, compress your answer in a (.zip) file.',
				'View the step here.',
			],
			href: '#',
			status: 'link',
		},
		{
			id: '04',
			name: 'Submit Answer Here',
			description: [
				'If you have already finished your answer, you can submit it again (the previous file(s) will be overridden)',
			],
			href: '#',
			status: 'file',
		},
	]
	const files = {
		name: 'answer.zip',
		modDate: '2020-05-15 07:20:00',
		size: '464,384 bytes',
	}

	return (
		<Layout title='Binusmaya Practicum'>
			{/* Identity */}
			<Identity isStudent={isStudent} user={user} />

			{/* practicum shedule now */}
			{!isStudent ? (
				<>
					<AstExtraClasses extra={extra}/>
					<RandomQuotes />
				</>
			) : (
				<>
					<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
						{practicum ? (
							<div className='sm:-mt-1'>
								{/* practicum */}
								<div className='practicum-subject'>
									<dl className='mt-5 grid grid-cols-1 bg-white overflow-hidden rounded-lg border border-2 border-gray-500 divide-y divide-gray-500 md:grid-cols-3 md:divide-y-0 md:divide-x'>
										<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
											<dt className='text-medium sm:text-lg font-bold text-gray-600'>Subject</dt>
											<dd className='sm:mt-1'>
												<div className='sm:text-lg font-semibold text-black'>
													{/* Subject */}
													ISYS6123-Introduction to Database Systems
												</div>
											</dd>
										</div>
										<dl className='grid grid-cols-2 divide-x divide-gray-500'>
											<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
												<dt className='text-medium sm:text-lg font-bold text-gray-600'>Room</dt>
												<dd className='sm:mt-1'>
													<div className='sm:text-lg font-semibold text-black'>
														{/* Room */}
														610
													</div>
												</dd>
											</div>
											<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
												<dt className='text-medium sm:text-lg font-bold text-gray-600'>Date</dt>
												<dd className='sm:mt-1'>
													<div className='sm:text-lg font-semibold text-black'>
														{/* Time */}
														28 Juni 2021
													</div>
												</dd>
											</div>
										</dl>
										<dl className='grid grid-cols-2 divide-x divide-gray-500'>
											<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
												<dt className='text-medium sm:text-lg font-bold text-gray-600'>Start Time</dt>
												<dd className='sm:mt-1'>
													<div className='sm:text-lg font-semibold text-black'>
														{/* Time */}
														07:20
													</div>
												</dd>
											</div>
											<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
												<dt className='text-medium sm:text-lg font-bold text-gray-600'>End Time</dt>
												<dd className='sm:mt-1'>
													<div className='sm:text-lg font-semibold text-black'>
														{/* Time */}
														09:00
													</div>
												</dd>
											</div>
										</dl>
									</dl>
								</div>

								{/* have quiz */}
								<div className='mt-5 grid grid-cols-1 divide-y-2 divide-gray-500 lg:grid-cols-2 lg:divide-x-2 lg:divide-y-0'>
									<div className='pb-2 sm:px-3 sm:py-2 lg:pl-3 lg:pr-6 lg:py-0'>
										<h3 className='text-xl leading-3 font-bold text-gray-900 mb-5 md:text-2xl md:leading-6'>
											Exam
										</h3>
										<nav aria-label='Progress'>
											<ol className='overflow-hidden'>
												{steps.map((step, stepIdx) => (
													<li
														key={stepIdx}
														className={classNames(stepIdx !== steps.length - 1 ? 'pb-6' : '', 'relative')}
													>
														{stepIdx !== steps.length - 1 ? (
															<div
																className='-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-blue-500 sm:left-5'
																aria-hidden='true'
															/>
														) : null}
														<a href={step.href} className='relative flex items-start group'>
															<span className='h-8 flex items-center sm:h-10' aria-hidden='true'>
																<span className='text-sm relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-500 text-blue-500 font-medium rounded-full group-hover:text-blue-700 group-hover:border-blue-700 sm:w-10 sm:h-10'>
																	{step.id}
																</span>
															</span>
															<span className='text-xs ml-2 min-w-0 flex flex-col sm:ml-4 sm:text-sm'>
																<span className='font-bold tracking-wide uppercase text-gray-500 group-hover:text-black'>
																	{step.name}
																</span>
																{step.description.map((desc) => (
																	<span
																		key={desc}
																		className='text-gray-500 font-medium group-hover:text-black'
																	>
																		{desc}
																	</span>
																))}
															</span>
														</a>
													</li>
												))}
											</ol>
										</nav>
									</div>

									{/* Answer */}
									<div className='pb-2 sm:px-3 sm:py-2 lg:pl-6 lg:pr-3 lg:py-0'>
										<h3 className='text-xl leading-3 font-bold text-gray-900 mb-5 md:text-2xl md:leading-6'>
											Your Answer
										</h3>
										<div className='flex flex-col'>
											<span className='font-bold'>
												Status: <span className={1 != 1 ? 'text-red-600' : 'text-green-600'}>Pending</span>
											</span>
											<span className='font-bold'>
												Upload Date: <span className='text-blue-600'>2020-05-15 07:20:00</span>
											</span>
											<span className='font-bold'>Files:</span>
											<div className='flex flex-col'>
												<div className='-my-2 overflow-x-auto'>
													<div className='py-2 align-middle inline-block max-w-full'>
														<div className='shadow overflow-hidden border-b'>
															<table className='w-full table-fixed'>
																<thead className='hidden bg-blue-600 sm:table-header-group'>
																	<tr>
																		<th
																			scope='col'
																			className='py-0.5 text-left text-sm font-medium text-white text-center tracking-wider w-1/4 border border-black'
																		>
																			File Name
																		</th>
																		<th
																			scope='col'
																			className='py-0.5 text-left text-sm font-medium text-white text-center tracking-wider w-1/2 border border-black'
																		>
																			Modified Date
																		</th>
																		<th
																			scope='col'
																			className='py-0.5 text-left text-sm font-medium text-white text-center tracking-wider w-1/4 border border-black'
																		>
																			Size
																		</th>
																	</tr>
																</thead>
																<tbody className='bg-white divide-y divide-gray-200'>
																	<tr className='table-row sm:hidden'>
																		<th
																			colSpan={2}
																			className='py-0.5 text-left text-sm font-medium text-white tracking-wider w-1/4 border border-black bg-blue-600 sm:text-center'
																		>
																			File Name
																		</th>
																		<td className='py-0.5 px-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black border border-black'>
																			{files.name}
																		</td>
																	</tr>
																	<tr className='table-row sm:hidden'>
																		<th
																			colSpan={2}
																			className='py-0.5 text-left text-sm font-medium text-white tracking-wider w-1/4 border border-black bg-blue-600 sm:text-center'
																		>
																			Modified Date
																		</th>
																		<td className='py-0.5 px-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black border border-black'>
																			{files.modDate}
																		</td>
																	</tr>
																	<tr className='table-row sm:hidden'>
																		<th
																			colSpan={2}
																			className='py-0.5 text-left text-sm font-medium text-white tracking-wider w-1/4 border border-black bg-blue-600 sm:text-center'
																		>
																			Size
																		</th>
																		<td className='py-0.5 px-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black border border-black'>
																			{files.size}
																		</td>
																	</tr>
																	<tr className='hidden sm:table-row'>
																		<td className='py-0.5 px-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black border border-black'>
																			{files.name}
																		</td>
																		<td className='py-0.5 px-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black border border-black'>
																			{files.modDate}
																		</td>
																		<td className='py-0.5 px-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black border border-black'>
																			{files.size}
																		</td>
																	</tr>
																	<tr className='bg-blue-600'>
																		<th
																			colSpan={3}
																			scope='col'
																			className='py-0.5 px-1 text-left text-sm font-medium text-white text-left tracking-wider w-1/4 border border-black'
																		>
																			File Size: {files.size}
																		</th>
																	</tr>
																	<tr className='bg-blue-600'>
																		<th
																			colSpan={3}
																			scope='col'
																			className='py-0.5 px-1 text-left text-sm font-medium text-white text-left tracking-wider w-1/4 border border-black'
																		>
																			Total File: 1 file(s)
																		</th>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
											<div className='flex justify-end items-start my-1'>
												<div
													className={`text-sm font-bold text-blue-600 underline hover:text-blue-800 cursor-pointer`}
												>
													Download your answer here
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<DividerWithMessage
								message='No practicum for this shift'
								size='md'
								bg='white'
								mt='-mt-3'
								color='gray-900'
							/>
						)}
					</div>
					{/* Procedure & rules */}
					<Procedures procedures={procedures} />

					{/* Events */}
					<Events events={events} />
				</>
			)}
		</Layout>
	)
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const userData = req.session.get('user')

	if (!userData || Date.now() >= new Date(userData.Token.expires).getTime()) {
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false,
			},
		}
	}
	const token = userData?.Token.token

	if (userData.Data.Role == 'Software Teaching Assistant') {
		const [smt, extra] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Schedule/GetSemesters').then((res) => {
				return res.data
			}),
			axios.get(process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassHeader/Assistant/' + userData.Data.Name).then((res) => res.data),
		])

		const user = {
			...userData,
			Semesters: smt,
		}

		return {
			props: {
				user,
				extra
			},
		}
	}

	const [smt, procedures, events] = await Promise.all([
		axios
			.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSemester', {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return res.data
			}),
		axios
			.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetProcedures', {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return res.data
			}),
		axios
			.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetEvents', {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return res.data
			}),
	])

	const user = {
		...userData,
		Semesters: smt,
	}

	return {
		props: {
			user,
			procedures,
			events,
		},
	}
})
