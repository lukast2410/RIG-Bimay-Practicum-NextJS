import axios from 'axios'
import Greeting from './Greeting'
import Navbar from './Navbar'
import { Fragment, useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import { useRouter } from 'next/router'
import { UserContext } from '../contexts/UserContext'
import Link from 'next/link'
import { SocketContext } from '../contexts/SocketContext'
import { BellIcon, XIcon } from '@heroicons/react/solid'
import { Transition } from '@headlessui/react'
import { Notification } from '../classes/Notification'
import Image from 'next/image'

export default function Header() {
	const router = useRouter()
	const [user, setUser] = useContext(UserContext)
	const [notif, setNotif] = useState<Notification>(null)
	const [show, setShow] = useState(false)
	const smt: any[] = user?.Semesters
	const currentSemesterIndex = smt?.findIndex((x) => x.SemesterId == user?.SemesterId)
	const currentSemester = smt?.find((x) => x.SemesterId == user?.SemesterId)
	const socket = useContext(SocketContext)
	const isStudent = user?.Data.Role != 'Software Teaching Assistant'
	const userSocketId = isStudent ? user?.Data.UserName : user?.Data.Name

	useEffect(() => {
		let mounted = false
		let connected = false
		if (mounted) return

		if (user) {
			socket.removeAllListeners('connect')
			socket.removeAllListeners('sendMessage')

			socket.on('connect', () => {
				socket.emit('userConnected', { id: userSocketId })
				connected = true
			})

			if (!connected) {
				socket.emit('userConnected', { id: userSocketId })
			}

			if (user.Notifications) {
				socket.on('sendMessage', (data: Notification) => {
					setNotif(data)
					setShow(true)
					setUser({ ...user, Notifications: [data, ...user.Notifications] })
				})
			}
		}

		return () => {
			mounted = true
		}
	}, [user])

	useEffect(() => {
		$(document).ready(function () {
			let isOpen = false

			$('.option').click(function () {
				isOpen = !isOpen
				var val = $(this).attr('data-value'),
					$drop = $('.drop'),
					prevActive = $('.active').attr('data-value'),
					options = $('.option').length
				$drop.find('.active').addClass('mini-hack')
				$drop.toggleClass('visible')
				$drop.removeClass('withBG')
				$(this).css('top')
				$drop.toggleClass('opacity')
				$('.mini-hack').removeClass('mini-hack')
				if ($drop.hasClass('visible')) {
					$drop.addClass('withBG')
				}
				triggerAnimation()
			})

			$('.drop').blur(function () {
				if (isOpen) {
					var val = $(this).attr('data-value'),
						$drop = $('.drop'),
						prevActive = $('.active').attr('data-value'),
						options = $('.option').length
					$drop.find('.active').addClass('mini-hack')
					$drop.toggleClass('visible')
					$drop.removeClass('withBG')
					$(this).css('top')
					$drop.toggleClass('opacity')
					$('.mini-hack').removeClass('mini-hack')
					if ($drop.hasClass('visible')) {
						$drop.addClass('withBG')
					}
					triggerAnimation()
					isOpen = false
				}
			})

			function triggerAnimation() {
				var finalWidth = $('.drop').hasClass('visible') ? 16.5 : 15.5
				$('.drop').css('width', '17.5em')
				setTimeout(function () {
					$('.drop').css('width', finalWidth + 'em')
				}, 400)
			}
		})
	}, [])

	const handleChangeSemester = async (idx) => {
		await axios
			.post(`/api/change-semester`, {
				semester: smt[idx].SemesterId,
			})
			.then((res) => {
				router.replace(router.asPath)
			})
	}

	return (
		<>
			<header className={`border-b border-solid border-gray-200`}>
				<div
					aria-live='assertive'
					className='fixed inset-0 flex px-4 py-6 pointer-events-none sm:p-6 items-start z-50'
				>
					<div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
						{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
						<Transition
							show={show}
							as={Fragment}
							enter='transform ease-out duration-300 transition'
							enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
							enterTo='translate-y-0 opacity-100 sm:translate-x-0'
							leave='transition ease-in duration-100'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='max-w-sm w-full bg-blue-600 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
								<div className='p-4'>
									<div className='flex items-start'>
										<div className='flex-shrink-0'>
											<BellIcon className='h-6 w-6 text-white mt-0.5' aria-hidden='true' />
										</div>
										<div className='ml-3 w-0 flex-1'>
											<Link href={`/extra-class/${notif?.ContentId}`}>
												<a>
													<p className='text-sm font-bold text-white'>{notif?.Title}</p>
													<p className='text-sm text-gray-100'>{notif?.Content}</p>
												</a>
											</Link>
										</div>
										<div className='ml-4 flex-shrink-0 flex'>
											<button
												className='bg-blue-600 rounded-md inline-flex text-white hover:text-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-200'
												onClick={() => {
													setShow(false)
												}}
											>
												<span className='sr-only'>Close</span>
												<XIcon className='h-5 w-5' aria-hidden='true' />
											</button>
										</div>
									</div>
								</div>
							</div>
						</Transition>
					</div>
				</div>
				<div className={`flex justify-between px-4 mr-auto ml-auto pb-5 max-w-screen-2xl`}>
					<div className={`flex`}>
						{/* <Image
							src={`/assets/ribbon.png`}
							width={40}
							height={130}
							loading='eager'
							className='object-cover object-top'
						/> */}
						<img src='/assets/ribbon.png' alt='Not Found' />
						<Link href='/'>
							<a href='/' className={`ml-2`}>
								<img src='/assets/binus.png' alt='Not Found' />
							</a>
						</Link>
					</div>
					<div className={`flex flex-col pt-5 items-end relative w-full`}>
						<div>
							<b className='flex flex-col text-right sm:flex-row'>
								<Greeting />
								<span className={`text-binus-blue`}>{user?.Data.Name}</span>
							</b>
						</div>
						<div className='mt-3 relative h-9'>
							<div className={`absolute right-0 top-0 z-20`}>
								<button
									className={`drop max-h-80 overflow-auto scroll-binus-blue focus:outline-none focus:text-left border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-binus-blue`}
								>
									<div className={`option active placeholder`} data-value={currentSemesterIndex}>
										{currentSemester?.Description}
									</div>
									{smt?.map((element, idx) => {
										if (idx == currentSemesterIndex) {
											return (
												<div key={idx} className='active option' data-value={idx}>
													{element.Description}
												</div>
											)
										} else {
											return (
												<div
													key={idx}
													className={`option`}
													data-value={idx}
													onClick={() => handleChangeSemester(idx)}
												>
													{element.Description}
												</div>
											)
										}
									})}
								</button>
							</div>
						</div>
					</div>
					<style jsx>
						{`
							.drop {
								width: 15.5rem;
								min-width: max-content;
								color: #212529;
								position: relative;
								-webkit-transition: width 0.3s;
								transition: width 0.3s;
								will-change: width;
								border-radius: 0.25rem;
							}

							.drop.withBG .placeholder {
								background-color: #ced4da;
							}

							.drop .active {
								min-width: 25vh;
							}

							.drop .option {
								padding: 0.375rem 2rem 0.375rem 0.75rem;
								cursor: pointer;
								background-color: #fff;
								text-align: left;
							}

							.drop .option:not(.placeholder) {
								display: none;
								opacity: 0;
								-webkit-transform: translateY(-20%);
								transform: translateY(-20%);
							}

							.drop.visible {
								-webkit-animation: bounce 1s;
								animation: bounce 1s;
								width: 24em;
							}

							.drop.visible:before,
							.drop.visible:after {
								border-color: black;
							}

							.drop.visible:before {
								opacity: 0;
							}

							.drop.visible:after {
								opacity: 1;
							}

							.drop.visible .option {
								color: #212529;
								display: block;
							}

							.drop.opacity .option {
								-webkit-transform: translateZ(0);
								transform: translateZ(0);
								transition: 0.4s ease;
								opacity: 1;
							}

							.drop.withBG .option {
								-webkit-transition: background-color 0.1s;
								transition: background-color 0.1s;
							}

							.drop.withBG .option:not(.placeholder):hover {
								background-color: #ececec;
							}

							.drop.withBG .option.active:not(.placeholder) {
								background-color: #00a9e2;
								color: white;
							}

							.drop.withBG .option.active:not(.placeholder):hover {
								color: black;
							}

							.drop:after,
							.drop:before {
								content: '';
								position: absolute;
								right: 1em;
								width: 0.6rem;
								height: 0.6rem;
								border: 0.2em solid black;
								-webkit-transform: rotate(45deg);
								transform: rotate(45deg);
								-webkit-transform-origin: 50% 50%;
								transform-origin: 50% 50%;
								-webkit-transition: opacity 0.2s;
								transition: opacity 0.2s;
							}

							.drop:before {
								border-left: none;
								border-top: none;
								top: 0.8rem;
							}

							.drop:after {
								border-right: none;
								border-bottom: none;
								opacity: 0;
								top: 1rem;
							}

							.mini-hack {
								opacity: 0;
								-webkit-transform: translateY(-20%);
								transform: translateY(-20%);
							}
						`}
					</style>
				</div>
			</header>
			<Navbar />
		</>
	)
}
