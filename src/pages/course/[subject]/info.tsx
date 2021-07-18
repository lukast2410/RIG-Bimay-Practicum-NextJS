import Router from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../../../components/Layout'
import { UserContext } from '../../../contexts/UserContext'
import withSession from '../../../lib/session'
import Link from 'next/link'
import LearningOutcome from '../../../components/Course/course-information/LearningOutcome'
import ClassDescription from '../../../components/Course/course-information/ClassDescription'
import Evaluation from '../../../components/Course/course-information/Evaluation'
import axios from 'axios'
import CourseBreadcrumbs from '../../../components/Course/course-information/Breadcrumbs'
import ReactHtmlParser from 'react-html-parser'

export default function Subject({ user, subject, courseDetail }) {
	const [userData, setUserData] = useContext(UserContext)
	const [optionValue, setOptionValue] = useState(0)
	const section = useRef(null)
	let desc = ''

	const urls = [
		`/course/${courseDetail.CourseOutlineDetail.CourseCode}-${courseDetail.CourseOutlineDetail.CourseName}/info`,
		`/course/${courseDetail.CourseOutlineDetail.CourseCode}-${courseDetail.CourseOutlineDetail.CourseName}/session-material`,
		`/course/${courseDetail.CourseOutlineDetail.CourseCode}-${courseDetail.CourseOutlineDetail.CourseName}/case-submission`,
		`/course/${courseDetail.CourseOutlineDetail.CourseCode}-${courseDetail.CourseOutlineDetail.CourseName}/group`,
	]

	const addRedirectTabs = (event) => {
		Router.push(urls[event.target.value])
		setOptionValue(event.target.value)
	}

	useEffect(() => {
		setUserData(user)
		window.scrollTo({
			top: section.current.offsetTop,
			behavior: 'auto',
		})
	}, [user])

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	return (
		<Layout title={courseDetail.CourseOutlineDetail.CourseName}>
			<div className='max-w-screen-2xl mx-auto sm:px-6 lg:px-8 mt-5 px-4'>
				<div className='course-description mb-3 text-center sm:text-left'>
					<div className='flex justify-center sm:justify-start'>
						<CourseBreadcrumbs courseOutlineDetail={courseDetail.CourseOutlineDetail} />
					</div>
					<h1 className='text-3xl font-bold mb-4 mt-4'>{courseDetail.CourseOutlineDetail.CourseName}</h1>
					<div>{ReactHtmlParser(courseDetail.CourseOutlineDetail.CourseDescription)}</div>
				</div>
				<div className='course-content flex flex-col justify-between xl:flex-row'>
					<div className='w-full mb-4 xl:w-3/5 xl:mb-0'>
						<LearningOutcome learningOutcome={courseDetail.CourseOutlineDetail.LearningOutcome} />
					</div>
					<div className='flex-none'>
						<ClassDescription subject={subject} studentGroupDetail={courseDetail.StudentGroupDetail} />
					</div>
				</div>
				<div className='course-tab mt-6'>
					<div className='sm:hidden'>
						<label htmlFor='tabs' className='sr-only'>
							Select a tab
						</label>
						<select
							id='tabs'
							name='tabs'
							className='block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
							onChange={addRedirectTabs}
							value={optionValue}
						>
							<option className='options' value={0}>
								Info
							</option>

							<option className='options' value={1}>
								Session & Material
							</option>

							<option className='options' value={2}>
								Case & Submission
							</option>

							<option className='options' value={3}>
								Group Forming
							</option>
						</select>
					</div>
					<div className='hidden sm:block' ref={section}>
						<div className='border-b border-gray-200'>
							<nav className='-mb-px flex' aria-label='Tabs'>
								<Link href={urls[0]}>
									<a
										href='#'
										className='border-binus-blue text-binus-blue w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
									>
										Info
									</a>
								</Link>

								<Link href={urls[1]}>
									<a
										href='#'
										className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
										aria-current='page'
									>
										Session & Material
									</a>
								</Link>

								<Link href={urls[2]}>
									<a
										href='#'
										className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
									>
										Case & Submission
									</a>
								</Link>

								<Link href={urls[3]}>
									<a
										href='#'
										className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
									>
										Group Forming
									</a>
								</Link>
							</nav>
						</div>
					</div>
				</div>
				<div className='info mt-6'>
					<Evaluation
						labEvaluation={courseDetail.CourseOutlineDetail.LaboratoryEvaluation}
						theoryEvaluation={courseDetail.CourseOutlineDetail.TheoryEvaluation}
					/>
				</div>
			</div>
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
	} else if (userData.Data.Role == 'Software Teaching Assistant') {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
	const token = userData?.Token.token

	const courses = await axios
		.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSchedule?SemesterId=' + userData.SemesterId, {
			headers: {
				authorization: 'Bearer ' + token,
			},
		})
		.then((res) => res.data)

	const subject = courses.find((x) => x.Subject == query.subject)
	if (!subject) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const url = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Binusmaya/GetScheduleDetail`
	const [smt, courseDetail, notif] = await Promise.all([
		axios
			.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSemester', {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => res.data),
		axios
			.get(url, {
				headers: {
					authorization: `Bearer ${token}`,
				},
				data: {
					SemesterId: userData.SemesterId,
					ClassTransactionId: subject.ClassTransactionId,
					CourseOutlineId: subject.CourseOutlineId,
				},
			})
			.then((response) => response.data),
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
			subject,
			courseDetail,
		},
	}
})
