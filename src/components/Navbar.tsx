import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { UserContext } from '../contexts/UserContext'
import Link from 'next/link'
import { SocketContext } from '../contexts/SocketContext'
import NotificationMenu from './notification/NotificationMenu'

export default function Navbar() {
	const [user, setUser] = useContext(UserContext)
	const router = useRouter()
	const courses: any[] = user?.Courses
	const [hover, setHover] = useState(false)
	const isStudent = user?.Data.Role != 'Software Teaching Assistant'
	const socket = useContext(SocketContext)

	const handleSignOut = async (e) => {
		e.preventDefault()

		const id = isStudent ? user.Data.UserName : user.Data.Name
		await axios.post(`/api/logout`)
		socket.emit('userSignout', { id: id })
		router.push('/auth/login')
	}

	return (
		<Disclosure as='nav' className='bg-white shadow sticky top-0 z-10'>
			{({ open }) => (
				<>
					<div className='max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8'>
						<div className='flex sm:justify-between h-12 sm:h-16'>
							<div className='flex'>
								<div className='hidden sm:flex sm:space-x-8'>
									<Link href='/'>
										<a
											className={`${
												router.route == '/'
													? 'border-binus-blue border-b-2 text-gray-900'
													: 'text-gray-500 hover:border-gray-300'
											} font-bold inline-flex items-center px-1 pt-1 hover:text-binus-blue`}
										>
											Home
										</a>
									</Link>
									{!isStudent ? null : (
										<>
											<div
												className={`${
													router.route.search('course') >= 0
														? 'border-binus-blue border-b-2 text-gray-900'
														: 'text-gray-500 hover:border-gray-300'
												} relative font-bold hover:text-binus-blue inline-flex items-center px-1 pt-1 border-b-2 border-transparent cursor-pointer`}
												onMouseEnter={() => {
													if (courses && courses.length > 0) setHover(true)
												}}
												onMouseLeave={() => setHover(false)}
											>
												<Popover className='relative'>
													<Popover.Button className='group bg-white rounded-md inline-flex items-center text-base font-bold focus:outline-none'>
														<span>Courses</span>
														<ChevronDownIcon className='ml-2 h-5 w-5 mt-1' aria-hidden='true' />
													</Popover.Button>

													<Transition
														show={hover}
														as={Fragment}
														enter='transition ease-out duration-200'
														enterFrom='opacity-0 translate-y-1'
														enterTo='opacity-100 translate-y-0'
														leave='transition ease-in duration-150'
														leaveFrom='opacity-100 translate-y-0'
														leaveTo='opacity-0 translate-y-1'
													>
														<Popover.Panel
															static
															className='absolute z-10 left-1/2 transform -translate-x-1/4 mt-3 px-2 w-max sm:px-0'
														>
															<div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
																<div className='relative grid gap-3 bg-white px-5 py-6 sm:gap-8'>
																	{courses?.map((item, idx) => (
																		<Link key={`course ${idx}`} href={`/course/${item.Subject}/info`}>
																			<a className='-m-3 p-3 block rounded-md hover:bg-gray-100'>
																				<p className='text-base font-medium text-gray-900'>{item.Subject}</p>
																			</a>
																		</Link>
																	))}
																</div>
															</div>
														</Popover.Panel>
													</Transition>
												</Popover>
											</div>
											<Link href='/schedule'>
												<a
													className={`${
														router.route.search('schedule') >= 0
															? 'border-binus-blue border-b-2 text-gray-900'
															: 'text-gray-500 hover:border-gray-300'
													} font-bold inline-flex items-center px-1 pt-1 hover:text-binus-blue`}
												>
													Schedule
												</a>
											</Link>
										</>
									)}
									<Link href='/extra-class'>
										<a
											className={`${
												router.route.search('extra-class') >= 0
													? 'border-binus-blue border-b-2 text-gray-900'
													: 'text-gray-500 hover:border-gray-300'
											} font-bold inline-flex items-center px-1 pt-1 hover:text-binus-blue`}
										>
											Extra Class
										</a>
									</Link>
								</div>
							</div>
							<div className='flex items-center justify-between w-full px-1 sm:hidden'>
								{/* Mobile menu button */}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-binus-blue'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<MenuIcon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
								<NotificationMenu />
							</div>
							<div className='hidden sm:ml-4 sm:flex sm:items-center'>
								<NotificationMenu />
								<div
									className={`font-bold text-gray-500 hover:text-binus-blue cursor-pointer ml-4 `}
									onClick={handleSignOut}
								>
									Sign Out
									<FontAwesomeIcon icon={faSignOutAlt} className={`ml-2`} />
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='pt-2 pb-2 space-y-1'>
							<Link href='/'>
								<a
									className={`${
										router.route == '/'
											? 'border-binus-blue bg-blue-50 text-binus-blue'
											: 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-transparent hover:border-gray-300'
									} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
								>
									Home
								</a>
							</Link>
							{!isStudent ? null : (
								<Link href='/schedule'>
									<a
										className={`${
											router.route.search('schedule') >= 0
												? 'border-binus-blue bg-blue-50 text-binus-blue'
												: 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-transparent hover:border-gray-300'
										} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
									>
										Schedules
									</a>
								</Link>
							)}
							<Link href='/extra-class'>
								<a
									className={`${
										router.route.search('extra-class') >= 0
											? 'border-binus-blue bg-blue-50 text-binus-blue'
											: 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-transparent hover:border-gray-300'
									} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
								>
									Extra Class
								</a>
							</Link>
						</div>
						{!isStudent ? null : (
							<div className={`border-gray-300 pt-2 pb-2 border-t space-y-1`}>
								<div className='text-gray-700 block text-center pt-1 text-base font-bold'>Courses</div>
								{courses?.map((item, idx) => (
									<Link key={idx} href={`/course/${item.Subject}/info`}>
										<a
											className={`${
												router.query.subject == item.Subject
													? 'border-binus-blue bg-blue-50 text-binus-blue'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-transparent hover:border-gray-300'
											} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
										>
											{item.Subject}
										</a>
									</Link>
								))}
							</div>
						)}
						<div className={`border-gray-300 pt-2 pb-2 border-t`}>
							<div
								className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-binus-blue hover:bg-gray-100 cursor-pointer'
								onClick={handleSignOut}
							>
								Sign out
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
