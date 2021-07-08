import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ListData from '../components/extraclass/ListData'
import SuccessMessage from '../components/extraclass/SuccessMessage'
import { UserContext } from '../contexts/UserContext'
import withSession from '../lib/session'
import { v4 as uuid } from 'uuid'
import router from 'next/router'

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

export default function ExtraClass({ user, listCourse }) {
	const [userData, setUserData] = useContext(UserContext)
	useEffect(() => setUserData(user), [user])

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	console.log(listCourse)
	const [course, setCourse] = useState(listCourse[0])
	const [shift, setShift] = useState(listShift[0])
	const date = new Date()
	const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	const mm = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	const today = date.getFullYear() + '-' + mm + '-' + dd

	const [open, setOpen] = useState(false)
	const [isSaving, setSaving] = useState(false)
	const handleSaveExtraClass = async (e) => {
		e.preventDefault()

		const body = {
			ExtraClassId: uuid(),
			Course: course.Name,
			Assistant1: e.target.first_ast.value.toUpperCase(),
			Assistant2: e.target.second_ast.value.toUpperCase(),
			Topics: e.target.topics.value,
			Room: e.target.room.value,
			LinkZoom: e.target.vidcon.value,
			LinkRecord: e.target.record.value,
			ExtraClassDate: e.target.date.value,
			Shift: shift.id,
			StartAbsent: null,
		}

		setSaving(true)
		const result = await axios
			.post(process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassHeader', body)
			.then((res) => res.data)

		setSaving(false)
		setOpen(true)
		console.log(result)
	}

	return (
		<Layout title='Add New Extra Class'>
			<div className='px-4 py-5 md:py-7 sm:px-5'>
				<div className='max-w-screen-md mx-auto px-4 py-5 rounded-lg sm:px-6 lg:px-8'>
					<form className='space-y-5 divide-y-2 divide-gray-400' onSubmit={handleSaveExtraClass}>
						<div className='space-y-8 divide-y divide-gray-200'>
							<div>
								<div className='text-center'>
									<h3 className='text-2xl leading-8 font-bold text-gray-900'>New Extra Class</h3>
									<p className='mt-1 text-sm text-gray-500'>Input extra class details.</p>
								</div>

								<div className=''>
									<p className='mt-1 font-semibold text-sm text-gray-900'><strong className='text-red-700'>*</strong> Required</p>
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
												className='shadow-sm block w-full sm:text-sm border-gray-300 bg-gray-200 rounded-md font-medium'
												disabled={true}
												value={user?.Data.Name}
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
												pattern='[A-Za-z]{2}'
											/>
										</div>
									</div>

									<div className='sm:col-span-6'>
										<ListData
											label='Select Course'
											listData={listCourse}
											selectedData={course}
											setSelectedData={setCourse}
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

								{/* <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
									<div className='sm:col-span-6 md:col-span-5'>
										<div className='flex justify-between'>
											<label htmlFor='record' className='block text-sm font-medium text-gray-700'>
												Link Recording
											</label>
											<span className='text-sm text-gray-500' id='email-optional'>
												Optional
											</span>
										</div>
										<div className='mt-1'>
											<textarea
												id='record'
												name='record'
												rows={2}
												className='shadow-sm focus:ring-binus-blue focus:border-binus-blue block w-full sm:text-sm border-gray-300 rounded-md'
												defaultValue={''}
												autoComplete=''
											/>
										</div>
									</div>
								</div> */}

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
									) : null }
									Save
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<SuccessMessage
				open={open}
				setOpen={setOpen}
				title='Extra Class Saved!'
				desc='The extra class successfully saved and will be notified to the students.'
				textBtn='Go back to extra class'
				callback={() => {router.push('/extra-class')}}
			/>
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
	} else if (userData.Data.Role == 'Software Teaching Assistant') {
		const token = userData?.Token.token
		const [smt, listCourse] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Schedule/GetSemesters').then((res) => res.data),
			axios
				.get(
					process.env.NEXT_PUBLIC_LABORATORY_URL +
						'Course/GetCourseOutlineInSemester?semesterId=' +
						userData.SemesterId,
					{
						headers: {
							authorization: 'Bearer ' + token,
						},
					}
				)
				.then((res) => res.data),
		])

		const user = {
			...userData,
			Semesters: smt,
		}

		return {
			props: {
				user,
				listCourse,
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
