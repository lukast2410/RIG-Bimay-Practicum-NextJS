import '../../styles/globals.scss'
import Head from 'next/head'
import { UserProvider } from '../contexts/UserContext'
import { SocketProvider } from '../contexts/SocketContext'
import { io } from 'socket.io-client'
import { useEffect } from 'react'

const socketServer = io('http://localhost:3100', { transports: ['websocket'] })

function MyApp({ Component, pageProps }) {
  useEffect(() => {
		navigator.serviceWorker.register('/service-worker.js')
    if(Notification.permission == 'default'){
			Notification.requestPermission((res) => {
				console.log("Notification: " + res)
			})
		}
  }, [])

	return (
		<SocketProvider socket={socketServer}>
			<UserProvider>
				<Head>
					<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				</Head>
				<Component {...pageProps} />
			</UserProvider>
		</SocketProvider>
	)
}

export default MyApp
