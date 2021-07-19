import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { UserContext } from '../contexts/UserContext'
import withSession from '../lib/session'
import NotifPagination from '../components/notification/NotifPagination'
import { BellIcon, CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import NotificationList from '../components/notification/NotificationList'
import router from 'next/router'

export default function ExtraClass({ user, listNotif }) {
	const [userData, setUserData] = useContext(UserContext)
	useEffect(() => {
		setUserData(user)
	}, [user])

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	const endPage = Math.ceil(listNotif.count / 10.0)
	const isStudent = !user?.Data.Role.includes('Software Teaching Assistant')
	const [isLoading, setLoading] = useState(false)
	const [notifications, setNotifications] = useState(listNotif.data)

	const handleMarkAllRead = async () => {
		const userId = isStudent ? user?.Data.UserName : user?.Data.Name
		const body = {
			StudentId: userId,
		}

		setLoading(true)
		const result = await axios
			.post(process.env.NEXT_PUBLIC_EXTRA_URL + 'NotificationDetail/MarkAllRead', body, {
				headers: {
					authorization: 'Bearer ' + user.Token.token,
				},
			})
			.then((res) => res.data)
		
		if(result){
			notifications.forEach(x => {
				x.details[0].IsRead = true
			});
			setNotifications(notifications)
		}
		setLoading(false)
	}

	return (
		<Layout title='Extra Class'>
			{listNotif && listNotif.data && listNotif.data.length > 0 ? (
				<div className='max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 pb-6'>
					<div className='pt-6 pb-3 border-b border-gray-200 sm:flex sm:items-center sm:justify-between'>
						<h3 className='text-lg leading-6 font-bold text-gray-900'>Notifications</h3>
						<div className='mt-1.5 sm:mt-0 sm:ml-4'>
							<button
								type='button'
								className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
								onClick={handleMarkAllRead}
							>
								<CheckCircleIcon
									className={`${isLoading ? 'animate-spin' : ''} -ml-1 mr-2 h-5 w-5`}
									aria-hidden='true'
								/>
								Mark all read
							</button>
						</div>
					</div>
					<ul className='divide-y divide-gray-200'>
						{notifications.map((nt, idx) => (
							<NotificationList notif={nt} key={idx} />
						))}
					</ul>
					<NotifPagination end={endPage} />
				</div>
			) : (
				<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-6'>
					<div className='w-full bg-blue-200 text-center rounded-lg px-4 py-10 mt-4'>
						<h1 className='text-blue-800 text-sm sm:text-2xl font-bold'>
							There are no notification available yet
						</h1>
						<p className='text-blue-700 text-xs sm:text-base font-medium'>
							Please wait until receive a new notification.
						</p>
					</div>
				</div>
			)}
		</Layout>
	)
}

export const getServerSideProps = withSession(async function ({ req, res, query }) {
	const userData = req.session.get('user')
	const page = query.page
	const start = !page || page <= 1 ? 0 : (page - 1) * 10
	const max = 10

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

	if (userData.Data.Role.includes('Software Teaching Assistant')) {
		const [smt, notif, listNotif] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Schedule/GetSemesters').then((res) => res.data),
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
			axios
				.get(
					`${process.env.NEXT_PUBLIC_EXTRA_URL}Notification/UserNotification/Limit?start=${start}&max=${max}`,
					{
						headers: {
							authorization: 'Bearer ' + token,
						},
						data: {
							SemesterId: userData.SemesterId,
							StudentId: userData.Data.Name,
						},
					}
				)
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
				listNotif,
			},
		}
	}

	const [smt, courses, notif, listNotif] = await Promise.all([
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
		axios
			.get(
				`${process.env.NEXT_PUBLIC_EXTRA_URL}Notification/UserNotification/Limit?start=${start}&max=${max}`,
				{
					headers: {
						authorization: 'Bearer ' + token,
					},
					data: {
						SemesterId: userData.SemesterId,
						StudentId: userData.Data.UserName,
					},
				}
			)
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
			listNotif,
		},
	}
})
