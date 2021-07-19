import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import ListData from '../../components/extraclass/ListData'
import SuccessMessage from '../../components/extraclass/SuccessMessage'
import { UserContext } from '../../contexts/UserContext'
import withSession from '../../lib/session'
import { v4 as uuid } from 'uuid'
import router from 'next/router'
import CreateConfirmation from '../../components/extraclass/CreateConfirmation'
import ListClass from '../../components/extraclass/ListClass'
import { SocketContext } from '../../contexts/SocketContext'

const listShift = [
	{ id: 1, Name: '1 (07:20 - 09:00)' },
	{ id: 2, Name: '2 (09:20 - 11:00)' },
	{ id: 3, Name: '3 (11:20 - 13:00)' },
	{ id: 4, Name: '4 (13:20 - 15:00)' },
	{ id: 5, Name: '5 (15:20 - 17:00)' },
	{ id: 6, Name: '6 (17:20 - 19:00)' },
	{ id: 7, Name: '7 (19:20 - 21:00)' },
	{ id: 8, Name: '8 (21:20 - 23:00)' },
]

export default function ExtraClass({ user, listCourse, classes }) {
	const [userData, setUserData] = useContext(UserContext)
	const socket = useContext(SocketContext)
	useEffect(() => setUserData(user), [user])

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	const [course, setCourse] = useState(listCourse[0])
	const [shift, setShift] = useState(listShift[0])
	const date = new Date()
	const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	const mm = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	const today = date.getFullYear() + '-' + mm + '-' + dd

	const [open, setOpen] = useState(false)
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [isSaving, setSaving] = useState(false)
	const [bodyData, setBodyData] = useState({})
	const [listClass, setListClass] = useState(classes)
	const [selectedClass, setSelectedClass] = useState(listClass[0])
	const [isLoading, setLoading] = useState(false)

	const settingCourseClasses = async (c) => {
		setCourse(c)
		setLoading(true)
		const result = await axios
			.get(
				`${process.env.NEXT_PUBLIC_LABORATORY_URL}ClassTransaction/GetClassTransactionByUser?semesterId=${user.SemesterId}&coId=${c.CourseOutlineId}`,
				{
					headers: {
						authorization: 'Bearer ' + user.Token.token,
					},
				}
			)
			.then((res) => res.data)
		setListClass(result)
		setSelectedClass(result[0])
		setLoading(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const id = uuid()
		const room = e.target.room.value.length == 0 ? 'Online' : e.target.room.value
		const body = {
			ClassTransactionId: selectedClass.ClassTransactionId,
			ExtraClass: {
				ExtraClassId: id,
				SemesterId: user.SemesterId,
				Course: course.Name,
				Class: selectedClass.ClassName,
				Assistant1: e.target.first_ast.value.toUpperCase(),
				Assistant2: e.target.second_ast.value.toUpperCase(),
				Topics: e.target.topics.value,
				Room: room,
				LinkZoom: e.target.vidcon.value,
				LinkRecord: '',
				ExtraClassDate: e.target.date.value,
				Shift: shift.id,
				StartAbsent: null,
			},
		}

		setBodyData(body)
		setOpenConfirmation(true)
	}

	const handleSaveExtraClass = async (body) => {
		const id = body.ExtraClassId

		setSaving(true)
		const header = await axios
			.post(process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassHeader', body, {
				headers: {
					authorization: 'Bearer ' + user.Token.token,
				},
			})
			.then((res) => res.data)

		setSaving(false)
		setOpenConfirmation(false)
		socket.emit('broadcastExtraClass', header.Notification)
		setOpen(true)
	}

	return (
		<Layout title='Add New Extra Class'>
			<div className='px-4 py-5 md:py-7 sm:px-5'>
				<div className='max-w-screen-md mx-auto px-4 py-5 rounded-lg sm:px-6 lg:px-8'>
					<form className='space-y-5 divide-y-2 divide-gray-400' onSubmit={handleSubmit}>
						<div className='space-y-8 divide-y divide-gray-200'>
							<div>
								<div className='text-center'>
									<h3 className='text-2xl leading-8 font-bold text-gray-900'>New Extra Class</h3>
									<p className='mt-1 text-sm text-gray-500'>Input extra class details.</p>
								</div>

								<div className=''>
									<p className='mt-1 font-semibold text-sm text-gray-900'>
										<strong className='text-red-700'>*</strong> Required
									</p>
								</div>

								<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
									<div className='sm:col-span-6'>
										<label htmlFor='first_name' className='block text-sm font-medium text-gray-700'>
											First Assistant<strong className='text-red-700'>*</strong> (ex. NP17-1)
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='first_ast'
												id='first_ast'
												autoComplete=''
												className='shadow-sm focus:ring-binus-blue focus:border-binus-blue block w-full sm:text-sm border-gray-300 rounded-md font-medium'
												defaultValue={user?.Data.Name}
											/>
										</div>
									</div>

									<div className='sm:col-span-6'>
										<label htmlFor='last_name' className='block text-sm font-medium text-gray-700'>
											Second Assistant (ex. DL18-2)
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='second_ast'
												id='second_ast'
												autoComplete=''
												className='shadow-sm focus:ring-binus-blue focus:border-binus-blue block w-full sm:text-sm border-gray-300 rounded-md font-medium'
											/>
										</div>
									</div>

									<div className='sm:col-span-6'>
										<ListData
											label='Select Course'
											listData={listCourse}
											selectedData={course}
											setSelectedData={settingCourseClasses}
											disable={false}
										/>
									</div>

									<div className='sm:col-span-6'>
										<ListClass
											label='Select Class'
											listData={listClass}
											selectedData={selectedClass}
											setSelectedData={setSelectedClass}
											disable={false}
											isLoading={isLoading}
										/>
									</div>

									<div className='sm:col-span-6'>
										<label htmlFor='date' className='block text-sm font-medium text-gray-700'>
											Date<strong className='text-red-700'>*</strong>
										</label>
										<div className='mt-1'>
											<input
												type='date'
												name='date'
												id='date'
												min={today}
												className='shadow-sm focus:ring-binus-blue focus:border-binus-blue block w-full sm:text-sm border-gray-300 rounded-md'
												required
											/>
										</div>
									</div>

									<div className='sm:col-span-6'>
										<ListData
											label='Shift'
											listData={listShift}
											selectedData={shift}
											setSelectedData={setShift}
											disable={false}
										/>
									</div>

									<div className='sm:col-span-6'>
										<label htmlFor='room' className='block text-sm font-medium text-gray-700'>
											Room
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='room'
												id='room'
												autoComplete=''
												maxLength={50}
												className='shadow-sm focus:ring-binus-blue focus:border-binus-blue block w-full sm:text-sm border-gray-300 rounded-md'
												defaultValue={'Online'}
											/>
										</div>
									</div>
								</div>

								<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
									<div className='sm:col-span-6 md:col-span-6'>
										<label htmlFor='vidcon' className='block text-sm font-medium text-gray-700'>
											Link Video Conference
										</label>
										<div className='mt-1'>
											<textarea
												id='vidcon'
												name='vidcon'
												rows={2}
												maxLength={500}
												className='shadow-sm focus:ring-binus-blue focus:border-binus-blue block w-full sm:text-sm border-gray-300 rounded-md'
												defaultValue={''}
												autoComplete=''
											/>
										</div>
									</div>
								</div>

								<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
									<div className='sm:col-span-6'>
										<label htmlFor='topics' className='block text-sm font-medium text-gray-700'>
											Topics<strong className='text-red-700'>*</strong>
										</label>
										<div className='mt-1'>
											<textarea
												id='topics'
												name='topics'
												rows={5}
												maxLength={500}
												className='shadow-sm focus:ring-binus-blue focus:border-binus-blue block w-full sm:text-sm border-gray-300 rounded-md'
												defaultValue={''}
												autoComplete=''
												required
											/>
										</div>
										<p className='mt-2 text-sm text-gray-600'>Write the topics that you will discuss.</p>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-5'>
							<div className='flex justify-end'>
								<button
									type='submit'
									className='ml-3 inline-flex justify-center items-center py-1.5 px-10 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
								>
									Create
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<CreateConfirmation
				open={openConfirmation}
				setOpen={setOpenConfirmation}
				callback={handleSaveExtraClass}
				isLoading={isSaving}
				data={bodyData}
			/>
			<SuccessMessage
				open={open}
				setOpen={setOpen}
				title='Extra Class Created!'
				desc='The extra class successfully created and will be notified to the students.'
				textBtn='Go back to extra class'
				callback={() => {
					router.push('/extra-class')
				}}
			/>
		</Layout>
	)
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const userData = req.session.get('user')

	if (!userData || !userData.Token || Date.now() >= new Date(userData.Token.expires).getTime()) {
		req.session.destroy()
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false,
			},
		}
	} else if (userData.Data.Role.includes('Software Teaching Assistant')) {
		const token = userData?.Token.token
		const [smt, listCourse, notif] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Schedule/GetSemesters').then((res) => res.data),
			axios
				.get(
					process.env.NEXT_PUBLIC_LABORATORY_URL +
						'course/GetCourseOutlineInSemesterByUser?semesterId=' +
						userData.SemesterId,
					{
						headers: {
							authorization: 'Bearer ' + token,
						},
					}
				)
				.then((res) => res.data),
			axios
				.get(`${process.env.NEXT_PUBLIC_EXTRA_URL}Notification/UserNotification/Limit?start=0&max=5`, {
					headers: {
						authorization: 'Bearer ' + token,
					},
					data: {
						SemesterId: userData.SemesterId,
						StudentId: userData.Data.Name,
					},
				})
				.then((res) => res.data),
		])

		const user = {
			...userData,
			Semesters: smt,
			Notifications: notif.data,
		}

		const classes = await axios
			.get(
				`${process.env.NEXT_PUBLIC_LABORATORY_URL}ClassTransaction/GetClassTransactionByUser?semesterId=${userData.SemesterId}&coId=${listCourse[0].CourseOutlineId}`,
				{
					headers: {
						authorization: 'Bearer ' + token,
					},
				}
			)
			.then((res) => res.data)

		return {
			props: {
				user,
				listCourse,
				classes,
			},
		}
	}

	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
})
