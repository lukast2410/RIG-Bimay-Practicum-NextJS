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
import PracticumSchedule from '../components/home/PracticumSchedule'
import ExamSchedule from '../components/home/ExamSchedule'
import { ModalProvider } from '../contexts/ModelContext'

export default function Home({ user, procedures, events, extra, practicum, exam }) {
	const [userData, setUserData] = useContext(UserContext)
	
	useEffect(() => {
		setUserData(user)
	}, [user])
	console.log(user)
	console.log(practicum)
	console.log(exam)

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	const isStudent = user?.Data.Role != 'Software Teaching Assistant'

	return (
		<Layout title='Binusmaya Practicum'>
			{/* Identity */}
			<Identity isStudent={isStudent} user={user} />

			{/* practicum shedule now */}
			{!isStudent ? (
				<>
					<AstExtraClasses extra={extra} />
					<RandomQuotes />
				</>
			) : (
				<>
					<ModalProvider>
						<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
							{exam || (practicum && practicum.Subject) ? (
								<div>
									{exam ? (
										<ExamSchedule exam={exam}/>
									) : (
										<PracticumSchedule practicum={practicum} />
									)}

								</div>
							) : (
								<DividerWithMessage
									message={practicum.Error}
									size='md'
									bg='white'
									mt='-mt-3'
									color='gray-900'
								/>
							)}
						</div>
					</ModalProvider>
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

	if (userData.Data.Role == 'Software Teaching Assistant') {
		const [smt, extra] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Schedule/GetSemesters').then((res) => {
				return res.data
			}),
			axios
				.get(process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassHeader/Assistant/' + userData.Data.Name, {
					headers: {
						authorization: 'Bearer ' + token,
					},
				})
				.then((res) => res.data),
		])

		const user = {
			...userData,
			Semesters: smt,
		}

		return {
			props: {
				user,
				extra,
			},
		}
	}

	const [smt, courses, procedures, events, practicum, exam] = await Promise.all([
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
			.get(
				process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSchedule?SemesterId=' + userData.SemesterId,
				{
					headers: {
						authorization: 'Bearer ' + token,
					},
				}
			)
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
		axios
			.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetPracticumInformation', {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return res.data
			}),
		axios
			.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetPracticum', {
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
		Courses: courses,
	}

	return {
		props: {
			user,
			procedures,
			events,
			practicum,
			exam
		},
	}
})
