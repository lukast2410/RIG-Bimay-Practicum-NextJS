import axios from 'axios'
import { useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import ExtraClassGrid from '../../components/extraclass/ExtraClassGrid'
import { UserContext } from '../../contexts/UserContext'
import withSession from '../../lib/session'
import { PlusCircleIcon, ChevronDownIcon, XIcon, BellIcon } from '@heroicons/react/solid'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'

export default function ExtraClass({ user, today, upcoming, previous }) {
	const [userData, setUserData] = useContext(UserContext)
	useEffect(() => {
		setUserData(user)
	}, [user])

	const isStudent = !user?.Data.Role.includes('Software Teaching Assistant')

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	return (
		<Layout title='Extra Class'>
			<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
				{!isStudent && (
					<div className='flex justify-between pt-4'>
						<h2 className='text-xl font-bold text-gray-900'>Extra Class</h2>
						<Link href='/extra-class/add'>
							<a className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-700'>
								Add New Extra Class
								<PlusCircleIcon className='ml-2 -mr-0.5 h-4 w-4' aria-hidden='true' />
							</a>
						</Link>
					</div>
				)}
				{today.length == 0 && upcoming.length == 0 && previous.length == 0 ? (
					<div className='w-full bg-blue-200 text-center rounded-lg px-4 py-10 mt-4'>
						<h1 className='text-blue-800 text-sm sm:text-2xl font-bold'>
							There are no extra class available yet
						</h1>
						<p className='text-blue-700 text-xs sm:text-base font-medium'>
							Please wait until your assistant add a new extra class
						</p>
					</div>
				) : (
					<div className='w-full pb-6 pt-4'>
						<div className='w-full p-2 bg-white rounded-2xl border border-gray-300'>
							{today.length > 0 && (
								<Disclosure as='div' className={`${upcoming.length > 0 || previous.length > 0 ? 'mb-2' : ''}`}>
									{({ open }) => (
										<>
											<Disclosure.Button className='flex justify-between w-full px-8 py-4 text-md font-bold text-left text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
												<span>Today Extra Class</span>
												<ChevronDownIcon
													className={`${
														open ? 'transform -rotate-180' : ''
													} w-6 h-6 text-blue-800 transition duration-200 ease-in`}
												/>
											</Disclosure.Button>
											<Transition
												show={open}
												enter='transition duration-200 ease-out'
												enterFrom='transform scale-95 opacity-0'
												enterTo='transform scale-100 opacity-100'
												leave='transition duration-150 ease-out'
												leaveFrom='transform scale-100 opacity-100'
												leaveTo='transform scale-95 opacity-0'
											>
												<Disclosure.Panel static className='px-2 py-2 lg:px-4 lg:pt-4 text-sm text-gray-500'>
													<ul className='divide-y divide-gray-300'>
														{today.map((x, idx) => (
															<ExtraClassGrid key={idx} extra={x} />
														))}
													</ul>
												</Disclosure.Panel>
											</Transition>
										</>
									)}
								</Disclosure>
							)}
							{upcoming.length > 0 && (
								<Disclosure as='div' className={`${previous.length > 0 ? 'mb-2' : ''}`}>
									{({ open }) => (
										<>
											<Disclosure.Button className='flex justify-between w-full px-8 py-4 text-md font-bold text-left text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
												<span>Upcoming Extra Class</span>
												<ChevronDownIcon
													className={`${
														open ? 'transform -rotate-180' : ''
													} w-6 h-6 text-blue-800 transition duration-200 ease-in`}
												/>
											</Disclosure.Button>
											<Transition
												show={open}
												enter='transition duration-200 ease-out'
												enterFrom='transform scale-95 opacity-0'
												enterTo='transform scale-100 opacity-100'
												leave='transition duration-150 ease-out'
												leaveFrom='transform scale-100 opacity-100'
												leaveTo='transform scale-95 opacity-0'
											>
												<Disclosure.Panel static className='px-2 py-2 lg:px-4 lg:pt-4 text-sm text-gray-500'>
													<ul className='divide-y divide-gray-200'>
														{upcoming.map((x, idx) => (
															<ExtraClassGrid key={idx} extra={x} />
														))}
													</ul>
												</Disclosure.Panel>
											</Transition>
										</>
									)}
								</Disclosure>
							)}
							{previous.length > 0 && (
								<Disclosure as='div' className=''>
									{({ open }) => (
										<>
											<Disclosure.Button className='flex justify-between w-full px-8 py-4 text-md font-bold text-left text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
												<span>Previous Extra Class</span>
												<ChevronDownIcon
													className={`${
														open ? 'transform -rotate-180' : ''
													} w-6 h-6 text-blue-800 transition duration-200 ease-in`}
												/>
											</Disclosure.Button>
											<Transition
												show={open}
												enter='transition duration-200 ease-out'
												enterFrom='transform scale-95 opacity-0'
												enterTo='transform scale-100 opacity-100'
												leave='transition duration-150 ease-out'
												leaveFrom='transform scale-100 opacity-100'
												leaveTo='transform scale-95 opacity-0'
											>
												<Disclosure.Panel static className='px-2 py-2 lg:px-4 lg:pt-4 text-sm text-gray-500'>
													<ul className='divide-y divide-gray-200'>
														{previous.map((x, idx) => (
															<ExtraClassGrid key={idx} extra={x} />
														))}
													</ul>
												</Disclosure.Panel>
											</Transition>
										</>
									)}
								</Disclosure>
							)}
						</div>
					</div>
				)}
			</div>
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
	}

	const token = userData?.Token.token
	const now = new Date()
	now.setHours(0, 0, 0, 0)

	if (userData.Data.Role.includes('Software Teaching Assistant')) {
		const [smt, extras, notif] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Schedule/GetSemesters').then((res) => res.data),
			axios
				.get(`${process.env.NEXT_PUBLIC_EXTRA_URL}ExtraClassHeader/InSemester/${userData.SemesterId}`, {
					headers: {
						authorization: 'Bearer ' + token,
					},
				})
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

		return {
			props: {
				user,
				today: extras.today,
				upcoming: extras.upcoming,
				previous: extras.previous,
			},
		}
	}

	const courses = await axios
		.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSchedule?SemesterId=' + userData.SemesterId, {
			headers: {
				authorization: 'Bearer ' + token,
			},
		})
		.then((res) => res.data)

	let listCourse = ''
	courses.forEach((x, idx) => {
		listCourse += x.Subject
		if (idx + 1 != courses.length) {
			listCourse += ','
		}
	})
	const [smt, extras, notif] = await Promise.all([
		axios
			.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSemester', {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => res.data),
		axios
			.get(
				`${process.env.NEXT_PUBLIC_EXTRA_URL}ExtraClassHeader/Courses/${userData.SemesterId}/${listCourse}`,
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

	return {
		props: {
			user,
			today: extras.today,
			upcoming: extras.upcoming,
			previous: extras.previous,
		},
	}
})
