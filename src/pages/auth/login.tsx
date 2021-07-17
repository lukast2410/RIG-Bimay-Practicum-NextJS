import Head from 'next/head'
import Particle from 'react-particles-js'
import axios from 'axios'
import useUser from '../../lib/useUser'
import styles from '../../../styles/pages/Login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { XIcon, XCircleIcon } from '@heroicons/react/solid'
import { useContext, useEffect, useState } from 'react'
import { EncryptToBase64 } from '../api/aes'
import router from 'next/router'
import withSession from '../../lib/session'
import { SocketContext } from '../../contexts/SocketContext'

export default function Login() {
	const { mutateUser } = useUser({
		redirectTo: '/',
		redirectIfFound: true,
	})
	const [isLogin, setLogin] = useState(false)
	const [isFailed, setFailed] = useState(false)

	const handleLogin = async (e) => {
		e.preventDefault()

		setLogin(true)
		let body = {
			username: e.target.username.value,
			password: e.target.password.value,
			role: 'Student'
		}

		const numbers = /^[0-9]+$/
		const binusian = /^[Bb][Nn][0-9]+$/
		const initial = /^[A-Za-z][A-Za-z][0-9][0-9]-[0-9]/
		const astCode = /^[Ll][Cc][0-9A-Za-z]+$/
		if (numbers.test(body.username) || binusian.test(body.username)) {
			try {
				await mutateUser(axios.post(`/api/login`, body))
				router.push('/')
			} catch (error) {
				setFailed(true)
				setLogin(false)
				console.log('Error happened: ' + error)
			}
		} else if (initial.test(body.username) || astCode.test(body.username)) {
			body.role = 'Assistant'
			body.password = EncryptToBase64(body.username, body.password)
			try {
				await mutateUser(axios.post(`/api/login`, body))
				router.push('/')
			} catch (error) {
				setFailed(true)
				setLogin(false)
				console.log('Error happened: ' + error)
			}
		} else {
			setFailed(true)
			setLogin(false)
		}
	}

	return (
		<main>
			<Head>
				<title>Login</title>
				<meta name='description' content='Login to Binusmaya Practicum' />
			</Head>
			<div className={`${styles.itemCenter}`}>
				<form
					onSubmit={handleLogin}
					name='formLogin'
					className={`rounded-xl lg:bg-grey-700 ${styles.formLogin}`}
					id='form-login'
					autoComplete='off'
				>
					<i className={styles.CIbanner}></i>
					<span className={styles.logoBinus}></span>

					<div className={styles.loginInputContainer}>
						<div className={`rounded-md bg-red-100 p-2.5 ${styles.inputControl}`} hidden={!isFailed}>
							<div className='flex'>
								<div className='flex-shrink-0'>
									<XCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
								</div>
								<div className='ml-3'>
									<p className='text-sm font-medium text-red-900'>Authentication Failed!</p>
								</div>
								<div className='ml-auto pl-3'>
									<div className='-mx-1.5 -my-1.5'>
										<button
											type='button'
											className='inline-flex bg-red-100 rounded-md p-1.5 text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-red-50 focus:ring-red-600'
											onClick={() => setFailed(false)}
										>
											<span className='sr-only'>Dismiss</span>
											<XIcon className='h-5 w-5' aria-hidden='true' />
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className={`rounded-md ${styles.inputControl}`}>
							<input
								name='username'
								placeholder='NIM / Binusian Number'
								required
								autoFocus={true}
								className={`rounded-md ${styles.inputComponent}`}
							/>
							<FontAwesomeIcon icon={faUser} className={styles.fa} />
						</div>

						<div className={`${styles.inputControl}`}>
							<input
								name='password'
								type='password'
								placeholder='Password'
								required
								className={`rounded-md ${styles.inputComponent}`}
							/>
							<FontAwesomeIcon icon={faLock} className={styles.fa} />
						</div>

						<button
							type='submit'
							className={`rounded-md inline-flex items-center justify-center transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-binus-blue ${styles.loginBtn}`}
						>
							{isLogin ? (
								<svg
									className='animate-spin h-5 w-5 -ml-4 mr-2 text-white'
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
							) : null }
							Login
						</button>
					</div>
				</form>
			</div>
			<footer className={styles.textCenter}>
				<div className={styles.desktopFooter}>
					Copyright © 2021 - Research and Development - SLC - Binus University
				</div>
				<div className={styles.mobileFooter}>
					<div className={styles.mobileFooterText}>Copyright © 2021</div>
					<div className={styles.mobileFooterText}>Research and Development</div>
					<div className={styles.mobileFooterText}>SLC - Binus University</div>
				</div>
			</footer>
			<Particle
				className={styles.particlesJS}
				params={{
					particles: {
						number: {
							value: 40,
							density: {
								enable: true,
								value_area: 800,
							},
						},
						color: {
							value: '#ffffff',
						},
						shape: {
							type: 'circle',
							stroke: {
								width: 0,
								color: '#000000',
							},
							polygon: {
								nb_sides: 5,
							},
							image: {
								src: 'img/github.svg',
								width: 100,
								height: 100,
							},
						},
						opacity: {
							value: 0.5,
							random: false,
							anim: {
								enable: false,
								speed: 1,
								opacity_min: 0.1,
								sync: false,
							},
						},
						size: {
							value: 2,
							random: true,
							anim: {
								enable: false,
								speed: 100,
								size_min: 0.1,
								sync: false,
							},
						},
						line_linked: {
							enable: true,
							distance: 150,
							color: '#ffffff',
							opacity: 1,
							width: 1,
						},
						move: {
							enable: true,
							speed: 1,
							direction: 'none',
							random: false,
							straight: false,
							out_mode: 'out',
							attract: {
								enable: false,
								rotateX: 600,
								rotateY: 1200,
							},
						},
					},
					interactivity: {
						detect_on: 'canvas',
						events: {
							onhover: {
								enable: true,
								mode: 'grab',
							},
							onclick: {
								enable: false,
								mode: 'bubble',
							},
							resize: true,
						},
						modes: {
							grab: {
								distance: 125,
								line_linked: {
									opacity: 1.5,
								},
							},
							bubble: {
								distance: 200,
								size: 3,
								duration: 1,
								opacity: 8,
							},
							repulse: {
								distance: 0,
							},
							push: {
								particles_nb: 4,
							},
							remove: {
								particles_nb: 2,
							},
						},
					},
					retina_detect: true,
					config_demo: {
						hide_card: false,
						background_color: '#b61924',
						background_image: '',
						background_position: '50% 50%',
						background_repeat: 'no-repeat',
						background_size: 'cover',
					},
				}}
			/>
		</main>
	)
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const userData = req.session.get('user')

	if (userData && userData.Token && Date.now() <= new Date(userData.Token.expires).getTime()) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return { props: {} }
})
