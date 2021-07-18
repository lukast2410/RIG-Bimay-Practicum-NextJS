import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import DeleteConfirmation from '../../components/extraclass/DeleteConfirmation'
import WarningConfirmation from '../../components/extraclass/WarningConfirmation'
import ExtraClassHeader from '../../components/extraclass/ExtraClassHeader'
import { UserContext } from '../../contexts/UserContext'
import DetailsData from '../../components/extraclass/DetailsData'
import withSession from '../../lib/session'
import router from 'next/router'
import { PrinterIcon, RefreshIcon } from '@heroicons/react/solid'
import { formatDate } from '../api/helper'
import { handlePrintReport } from '../api/print-report'

export default function ExtraClassDetail({ user, extra }) {
	const [userData, setUserData] = useContext(UserContext)
	useEffect(() => {
		setUserData(user)
	}, [user])
	console.log(extra)

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	const isStudent = user?.Data.Role != 'Software Teaching Assistant'
	const isOwner = !isStudent && (extra.Assistant1 == user.Data.Name || extra.Assistant2 == user.Data.Name)
	const startAbsent = extra.StartAbsent == null ? null : new Date(extra.StartAbsent)
	const endAbsent = extra.StartAbsent == null ? null : new Date(extra.StartAbsent)
	endAbsent?.setMinutes(endAbsent?.getMinutes() + 30)
	const absentNotStarted = startAbsent == null
	const absentValid = startAbsent != null && Date.now() <= endAbsent.getTime()
	const student = extra.details.find((x) => x.StudentId == user.Data.UserName)
	const [open, setOpen] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [isSaving, setSaving] = useState(false)

	const handleDelete = async () => {
		setLoading(true)
		const result = await axios.delete(
			process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassHeader/' + extra.ExtraClassId,
			{
				headers: {
					authorization: 'Bearer ' + user.Token.token,
				},
			}
		)

		setLoading(false)
		router.push('/extra-class')
	}

	const handleStartAbsent = async () => {
		const body = {
			ExtraClassId: extra.ExtraClassId,
		}

		setSaving(true)
		const result = await axios
			.post(process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassHeader/StartAbsent', body, {
				headers: {
					authorization: 'Bearer ' + user.Token.token,
				},
			})
			.then((res) => res.data)

		console.log(result)
		setSaving(false)
		setOpenConfirmation(false)
		router.replace(router.asPath)
	}

	const handleAbsentStudent = async () => {
		if (absentValid) {
			const body = {
				ExtraClassId: extra.ExtraClassId,
				StudentId: user.Data.UserName,
				StudentName: user.Data.Name,
			}

			setSaving(true)
			const result = await axios
				.post(process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassDetails/Present', body, {
					headers: {
						authorization: 'Bearer ' + user.Token.token,
					},
				})
				.then((res) => res.data)
			console.log(result)

			setSaving(false)
		}
		router.replace(router.asPath)
	}

	return (
		<Layout title='Extra Class Detail'>
			<div id='content'>
				<ExtraClassHeader extra={extra} isOwner={isOwner} setOpen={setOpen} />
				<div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-6'>
					<dl className='sm:divide-y sm:divide-gray-200'>
						{isStudent && (
							<div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Status</dt>
								<dd
									className={`mt-1 text-sm ${
										student?.Status == 'Present' ? 'text-green-600' : 'text-red-700'
									} font-bold sm:mt-0 sm:col-span-2`}
								>
									{student?.Status}
								</dd>
							</div>
						)}
						<div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Lecturer</dt>
							<dd className='flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
								<p className='px-2 leading-6 font-semibold rounded-full bg-blue-100 text-blue-800'>
									{extra.Assistant1}
								</p>
								{extra.Assistant2 != '' && (
									<p className='ml-2 px-2 leading-6 font-semibold rounded-full bg-blue-100 text-blue-800'>
										{extra.Assistant2}
									</p>
								)}
							</dd>
						</div>
						<div className='py-4 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='flex items-center text-sm font-medium text-gray-500'>Link Video Conference</dt>
							<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
								{extra.LinkZoom == '' || !extra.LinkZoom.includes('http') ? (
									<p>To be announced...</p>
								) : (
									<a href={extra.LinkZoom}>
										<button
											type='button'
											className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
										>
											Join Video Conference
										</button>
									</a>
								)}
							</dd>
						</div>
						<div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='flex items-center text-sm font-medium text-gray-500'>Link Record</dt>
							<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
								{extra.LinkRecord == '' ? (
									<p>There is no recording...</p>
								) : (
									<a href={extra.LinkRecord}>
										<button
											type='button'
											className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
										>
											View Recording
										</button>
									</a>
								)}
							</dd>
						</div>
						<div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Topics</dt>
							<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{extra.Topics}</dd>
						</div>
					</dl>
					{!isStudent && <DetailsData extra={extra} />}
					{isOwner && (
						<div className='py-5 border-t border-gray-200 mt-5'>
							{startAbsent ? (
								<div className='flex items-end justify-center flex-col sm:flex-row sm:justify-end sm:items-center'>
									<p className='font-medium text-gray-600'>
										Absent Started at{' '}
										{startAbsent?.getHours() +
											':' +
											startAbsent?.getMinutes() +
											', ' +
											formatDate(startAbsent)}
									</p>
									<button
										type='button'
										className='ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 mt-2 sm:mt-0 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
										onClick={() => handlePrintReport(extra)}
									>
										<PrinterIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
										Print Report
									</button>
								</div>
							) : (
								<div className='flex items-end justify-center flex-col sm:flex-row sm:justify-end sm:items-center'>
									<button
										type='button'
										className='inline-flex justify-center items-center py-1.5 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none'
										onClick={() => setOpenConfirmation(true)}
									>
										Start Absent
									</button>
								</div>
							)}
						</div>
					)}
					{isStudent && absentValid && student?.Status != 'Present' && (
						<div className='py-5 border-t border-gray-200 flex justify-end mt-5'>
							<button
								type='submit'
								className='ml-3 inline-flex justify-center items-center py-1.5 px-10 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none'
								onClick={handleAbsentStudent}
							>
								{isSaving ? (
									<svg
										className='animate-spin h-5 w-5 -ml-4 mr-2 text-white'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										></path>
									</svg>
								) : null}
								Absent
							</button>
						</div>
					)}
					{isStudent && (
						<div className='py-5 border-t border-gray-200 flex justify-end mt-5'>
							{!absentNotStarted && !absentValid && (
								<p className='font-medium text-gray-600'>Absence time has passed.</p>
							)}
							{absentNotStarted && (
								<div className='flex flex-col sm:flex-row justify-center items-end sm:items-center'>
									<p className='font-medium text-gray-600'>Attendance hasn't started</p>
									<button
										type='button'
										className='ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 mt-2 sm:mt-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
										onClick={() => router.replace(router.asPath)}
									>
										<RefreshIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
										Refresh
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			<DeleteConfirmation
				title='Delete Extra Class'
				desc='Are you sure you want to delete this extra class? All of your data will be permanently removed from our servers forever. This action cannot be undone.'
				open={open}
				setOpen={setOpen}
				callback={handleDelete}
				isLoading={isLoading}
			/>
			<WarningConfirmation
				title='Start Absent'
				desc='Are you sure you want to start the absence? Students can only absent for 30 minutes after you start the absence.'
				open={openConfirmation}
				setOpen={setOpenConfirmation}
				callback={handleStartAbsent}
				isLoading={isSaving}
			/>
		</Layout>
	)
}

export const getServerSideProps = withSession(async function ({ req, res, query }) {
	const userData = req.session.get('user')

	if (!userData || !userData.Token || Date.now() >= new Date(userData.Token.expires).getTime()) {
		req.session.destroy()
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false,
			},
		}
	} 

	const token = userData?.Token.token
	const extraClassId = query.ExtraClassId

	if (userData.Data.Role == 'Software Teaching Assistant') {
		const [smt, extra, notif] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Schedule/GetSemesters').then((res) => res.data),
			axios
				.get(`${process.env.NEXT_PUBLIC_EXTRA_URL}ExtraClassHeader/${userData.SemesterId}/${extraClassId}`, {
					headers: {
						authorization: 'Bearer ' + token,
					},
				})
				.then((res) => res.data.data)
				.catch((err) => null),
			axios
				.get(
					`${process.env.NEXT_PUBLIC_EXTRA_URL}Notification/UserNotification/Limit?start=0&max=5`,
					{
						headers: {
							authorization: 'Bearer ' + token,
						},
						data: {
							SemesterId: userData.SemesterId,
							StudentId: userData.Data.Name
						}
					}
				)
				.then((res) => res.data),
		])

		const user = {
			...userData,
			Semesters: smt,
			Notifications: notif.data,
		}

		if (!extra) {
			return {
				redirect: {
					destination: '/extra-class',
					permanent: false,
				},
			}
		}

		if (extra.Room == '' || extra.Room == '-') extra.Room = 'Online'

		return {
			props: {
				user,
				extra,
			},
		}
	}

	const [smt, courses, extra, notif] = await Promise.all([
		axios
			.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSemester', {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => res.data),
		axios
			.get(
				process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSchedule?SemesterId=' + userData.SemesterId,
				{
					headers: {
						authorization: 'Bearer ' + token,
					},
				}
			)
			.then((res) => res.data),
		axios
			.get(`${process.env.NEXT_PUBLIC_EXTRA_URL}ExtraClassHeader/${userData.SemesterId}/${extraClassId}`, {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => res.data.data)
			.catch((err) => null),
			axios
			.get(`${process.env.NEXT_PUBLIC_EXTRA_URL}Notification/UserNotification/Limit?start=0&max=5`, {
				headers: {
					authorization: 'Bearer ' + token,
				},
				data: {
					SemesterId: userData.SemesterId,
					StudentId: userData.Data.UserName,
				},
			})
			.then((res) => res.data),
	])

	const softwareCourse = courses.filter((course) => course.Laboratory === 'Software')

	const user = {
		...userData,
		Semesters: smt,
		Courses: softwareCourse,
		Notifications: notif.data,
	}

	if (!extra) {
		return {
			redirect: {
				destination: '/extra-class',
				permanent: false,
			},
		}
	}

	if (extra.Room == '' || extra.Room == '-') extra.Room = 'Online'

	return {
		props: {
			user,
			extra,
		},
	}
})
