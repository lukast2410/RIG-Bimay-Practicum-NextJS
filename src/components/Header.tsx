import axios from 'axios'
import Greeting from './Greeting'
import Navbar from './Navbar'
import { useContext, useEffect } from 'react'
import $ from 'jquery'
import { useRouter } from 'next/router'
import { UserContext } from '../contexts/UserContext'
import Link from 'next/link'

export default function Header() {
	const router = useRouter()
	const [user, setUser] = useContext(UserContext)
	const smt: any[] = user?.Semesters
	const currentSemesterIndex = smt?.findIndex((x) => x.SemesterId == user?.SemesterId)
	const currentSemester = smt?.find((x) => x.SemesterId == user?.SemesterId)

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
				var finalWidth = $('.drop').hasClass('visible') ? 17 : 15
				$('.drop').css('width', '19em')
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
		<div id='header-main'>
			<header className={`border-b border-solid border-gray-200`}>
				<div className={`flex justify-between px-4 mr-auto ml-auto pb-5 max-w-screen-2xl`}>
					<div className={`flex`}>
						<img src='https://academic-slc.apps.binus.ac.id/assets/ribbon.png' alt='Not Found' />
						<Link href='/'>
							<a href='/' className={`ml-2`}>
								<img src='https://academic-slc.apps.binus.ac.id/assets/logo.png' alt='Not Found' />
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
							<div className={`absolute right-0 top-0 z-10`}>
								<button
									className={`drop w-60 max-h-80 overflow-auto focus:outline-none focus:bg-grey text-left border border-gray-300`}
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
		</div>
	)
}
