import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
import { Fragment, useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import DividerWithMessage from '../home/DividerWithMessage'
import NotificationItem from './NotificationItem'

export default function NotificationMenu() {
	const [user, setUser] = useContext(UserContext)
	const notification = user?.Notifications
	const findRead = notification?.find((x) => x.details[0].IsRead == false)
	const isStudent = user?.Data.Role != 'Software Teaching Assistant'
	const [isLoading, setLoading] = useState(false)

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
		setLoading(false)

		router.push(router.asPath)
	}

	return (
		<Menu as='div' className='relative inline-block text-left'>
			{({ open }) => (
				<>
					<div>
						<Menu.Button className='relative flex-shrink-0 bg-white p-1 m-1 text-gray-500 rounded-full hover:text-binus-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue'>
							<span className='sr-only'>View notifications</span>
							<BellIcon className='h-6 w-6' aria-hidden='true' />
							{findRead && (
								<span className='absolute h-2.5 w-2.5 z-10 bg-gradient-to-r from-red-500 to-red-700 top-0.5 right-0.5 rounded-full'></span>
							)}
						</Menu.Button>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<div className='absolute z-10 transform right-0 sm:-right-1/2 mt-1 pl-9 w-screen max-w-sm sm:px-0'>
							<Menu.Items
								static
								className='rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
							>
								<div className='bg-white font-bold text-base py-2.5 px-4 border-b-2 border-gray-200'>
									Notifications
								</div>
								<div>
									{!notification || notification.length == 0 ? (
										<div className='py-4 px-2 rounded-lg bg-white'>
											<DividerWithMessage
												bg='white'
												color='gray-900'
												message='No new notifications'
												mt='0'
												size='sm'
											/>
										</div>
									) : (
										<div>
											<div className='overflow-auto max-h-72 scroll-blue-500'>
												{notification.map((notif, idx) => (
													<NotificationItem key={idx} notif={notif} />
												))}
											</div>
											{notification.length > 4 && (
												<div className='flex justify-between items-center border-t-2 border-gray-200 py-1 px-2'>
													<button
														type='button'
														className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-600 hover:text-blue-700 focus:outline-none'
														onClick={handleMarkAllRead}
													>
														Mark all read
														{isLoading ? (
															<svg
																className='animate-spin h-4 w-4 ml-2 text-blue-500'
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
													</button>
													<Link href='/notification'>
														<a className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-600 hover:text-blue-700 focus:outline-none'>
															See more
														</a>
													</Link>
												</div>
											)}
										</div>
									)}
								</div>
							</Menu.Items>
						</div>
					</Transition>
				</>
			)}
		</Menu>
	)
}
