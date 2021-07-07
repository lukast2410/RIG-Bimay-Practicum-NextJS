import axios from 'axios'
import { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { UserContext } from '../contexts/UserContext'
import withSession from '../lib/session'
import { PlusCircleIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import DividerWithMessage from '../components/home/DividerWithMessage'
import { isFunctionExpression } from 'typescript'

function dateDiffInDays(d1, d2): number {
	let dt1 = new Date(d1)
	let dt2 = new Date(d2)
	return Math.floor(
		(Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
			Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
			(1000 * 60 * 60 * 24)
	)
}

export default function ExtraClass({ user, today, upcoming, previous }) {
	const [userData, setUserData] = useContext(UserContext)
	useEffect(() => setUserData(user), [user])

	const isStudent = user?.Data.Role != 'Software Teaching Assistant'
	console.log(today)
	console.log(upcoming)
	console.log(previous)

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>
	}

	return (
		<Layout title='Extra Class'>
			<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between py-4'>
					<h2 className='text-xl font-bold text-gray-900'>Extra Class</h2>
					{isStudent ? null : (
						<Link href='/add-extra-class'>
							<a className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'>
								Add New Extra Class
								<PlusCircleIcon className='ml-2 -mr-0.5 h-4 w-4' aria-hidden='true' />
							</a>
						</Link>
					)}
				</div>
				<div className='w-full'>
					<div className='w-full p-2 bg-gray-50 rounded-2xl border border-gray-300'>
						{today.length == 0 && upcoming.length == 0 && previous.length == 0 && (
							<div className='py-4 px-5 rounded-md bg-red-50'>
								<DividerWithMessage message='There is no extra class' bg='red-50' size='lg' mt='' color='red-800'/>
							</div>
						)}
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
											<Disclosure.Panel static className='px-4 pt-4 pb-2 text-sm text-gray-500'>
												If you're unhappy with your purchase for any reason, email us within 90 days and we'll
												refund you in full, no questions asked.
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
											<Disclosure.Panel static className='px-4 pt-4 pb-2 text-sm text-gray-500'>
												If you're unhappy with your purchase for any reason, email us within 90 days and we'll
												refund you in full, no questions asked.
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
											<Disclosure.Panel static className='px-4 pt-4 pb-2 text-sm text-gray-500'>
												If you're unhappy with your purchase for any reason, email us within 90 days and we'll
												refund you in full, no questions asked.
											</Disclosure.Panel>
										</Transition>
									</>
								)}
							</Disclosure>
						)}
					</div>
				</div>
			</div>
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
	const today = []
	const previous = []
	const upcoming = []
	const now = new Date()
	now.setHours(0, 0, 0, 0)

	if (userData.Data.Role == 'Software Teaching Assistant') {
		const [smt, extras] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_LABORATORY_URL + 'Schedule/GetSemesters').then((res) => res.data),
			axios.get(process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassHeader').then((res) => res.data),
		])

		const user = {
			...userData,
			Semesters: smt,
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

	let listCourse = ''
	userData.Courses.forEach((x, idx) => {
		listCourse += x.Subject
		if (idx + 1 != userData.Courses.length) {
			listCourse += ','
		}
	})
	const [smt, extras] = await Promise.all([
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
			.get(process.env.NEXT_PUBLIC_EXTRA_URL + 'ExtraClassHeader/Courses/' + listCourse)
			.then((res) => res.data),
	])

	const user = {
		...userData,
		Semesters: smt,
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
