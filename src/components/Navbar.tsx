import React, { Fragment, useContext, useState } from 'react';
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '../contexts/UserContext';
import Link from 'next/link';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const [user, setUser] = useContext(UserContext);
	const router = useRouter();
	const courses: any[] = user?.Courses;
	const [hover, setHover] = useState(false);

	const handleSignOut = async (e) => {
		e.preventDefault();

		await axios.post(`/api/logout`);
		router.push('/auth/login');
	};

	return (
		<Disclosure as='nav' className='bg-white shadow'>
			{({ open }) => (
				<>
					<div className='max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8'>
						<div className='flex justify-between h-16'>
							<div className='flex px-2 md:px-0'>
								<div className='hidden md:flex md:space-x-8'>
									<Link href="/">
										<a
											className={`border-binus-blue font-bold text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 hover:text-binus-blue`}
										>
											Home
										</a>
									</Link>
									<div
										className='relative font-bold text-gray-500 hover:text-binus-blue inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 cursor-pointer'
										onMouseEnter={() => setHover(true)}
										onMouseLeave={() => setHover(false)}
									>
										<Popover className='relative'>
											<Popover.Button className='group bg-white rounded-md inline-flex items-center text-base font-bold  focus:outline-none'>
												<span>Courses</span>
												<ChevronDownIcon className='ml-2 h-5 w-5' aria-hidden='true' />
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
																<Link key={`course ${idx}`} href={`/course/${item.Subject}`}>
																	<a className='-m-3 p-3 block rounded-md hover:bg-gray-100
																	'>
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
									<Link href="/schedule">
										<a
											href='#'
											className={`font-bold text-gray-500 hover:text-binus-blue inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300`}
										>
											Schedule
										</a>
									</Link>
									<Link href="/extra-class">
										<a
											href='#'
											className={` font-bold text-gray-500 hover:text-binus-blue inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300`}
										>
											Extra Class
										</a>
									</Link>
								</div>
							</div>
							<div className='flex-1 flex items-center justify-center px-2 md:ml-6 md:justify-end'>
								<div className='max-w-lg w-full md:max-w-xs'>
									<label htmlFor='search' className='sr-only'>
										Search
									</label>
									<div className='relative'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
										</div>
										<input
											id='search'
											name='search'
											className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-binus-blue focus:border-binus-blue sm:text-sm`}
											placeholder='Search'
											type='search'
										/>
									</div>
								</div>
							</div>
							<div className='flex items-center md:hidden'>
								{/* Mobile menu button */}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<MenuIcon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
							<div className='hidden md:ml-4 md:flex md:items-center' onFocus={() => console.log('tes')}>
								<button className='flex-shrink-0 bg-white p-1 text-gray-500 rounded-full hover:text-binus-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue'>
									<span className='sr-only'>View notifications</span>
									<BellIcon className='h-6 w-6' aria-hidden='true' />
								</button>
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

					<Disclosure.Panel className='md:hidden'>
						<div className='pt-2 pb-3 space-y-1'>
							<a
								href='#'
								className={`border-binus-blue bg-indigo-50 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
							>
								Dashboard
							</a>
							<a
								href='#'
								className={`text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent hover:border-gray-300`}
							>
								Team
							</a>
							<a
								href='#'
								className={`text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent hover:border-gray-300`}
							>
								Projects
							</a>
							<a
								href='#'
								className={`text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent hover:border-gray-300`}
							>
								Calendar
							</a>
						</div>
						<div className={`border-gray-300 pt-4 pb-3 border-t`}>
							<div className='flex items-center px-4'>
								<div className='flex-shrink-0'>
									<img
										className='h-10 w-10 rounded-full'
										src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
										alt=''
									/>
								</div>
								<div className='ml-3'>
									<div className='text-base font-medium text-gray-800'>Tom Cook</div>
									<div className='text-sm font-medium text-gray-500'>tom@example.com</div>
								</div>
								<button className='ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
									<span className='sr-only'>View notifications</span>
									<BellIcon className='h-6 w-6' aria-hidden='true' />
								</button>
							</div>
							<div className='mt-3 space-y-1'>
								<a
									href='#'
									className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
								>
									Your Profile
								</a>
								<a
									href='#'
									className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
								>
									Settings
								</a>
								<a
									href='#'
									className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
								>
									Sign out
								</a>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
