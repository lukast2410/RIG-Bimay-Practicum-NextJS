import '../../styles/globals.scss'
import Head from 'next/head'
import { UserProvider } from '../contexts/UserContext'
import { SocketProvider } from '../contexts/SocketContext'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import UpdateSuccess from '../components/UpdateSuccess'
import { useRouter } from 'next/router'

const socketServer = io('https://binusmaya-practicum.herokuapp.com', { transports: ['websocket'] })

function MyApp({ Component, pageProps }) {
	const [open, setOpen] = useState(false)
	const router = useRouter()

	useEffect(() => {
		navigator.permissions.query({ name: 'notifications' }).then((permission) => {
			permission.onchange = () => {
				if (permission.state == 'granted') {
					navigator.serviceWorker.register('/sw.js')
					if (router.asPath != '/auth/login') {
						setOpen(true)
					}
				}
			}
		})
		if (Notification.permission == 'default') {
			unregisterServiceWorker()
			Notification.requestPermission((res) => {})
		} else if (Notification.permission == 'denied') {
			unregisterServiceWorker()
		} else if (Notification.permission == 'granted') {
			navigator.serviceWorker.register('/sw.js')
		}
	}, [])

	const unregisterServiceWorker = async () => {
		await navigator.serviceWorker.getRegistrations().then(async function (registrations) {
			for (let registration of registrations) {
				await registration.unregister()
			}
		})
	}

	return (
		<SocketProvider socket={socketServer}>
			<UserProvider>
				<Head>
					<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				</Head>
				<UpdateSuccess open={open} setOpen={setOpen} />
				<Component {...pageProps} />
			</UserProvider>
		</SocketProvider>
	)
}

export default MyApp
