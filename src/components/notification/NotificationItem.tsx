import { Menu } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/solid'
import axios from 'axios'
import router from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

export default function NotificationItem({ notif }) {
  const [user, setUser] = useContext(UserContext)
	const isRead = notif.details[0].IsRead
	const link = notif.Type == 'ExtraClass' ? `/extra-class/${notif.ContentId}` : `/course/${notif.ContentId}/group`
	const handleNotification = async () => {
		if (!isRead) {
			const body = {
				NotificationId: notif.NotificationId,
				StudentId: notif.details[0].StudentId,
			}
			await axios.post(process.env.NEXT_PUBLIC_EXTRA_URL + 'NotificationDetail/Read', body, {
				headers: {
					authorization: 'Bearer ' + user.Token.token,
				},
			}).then(res => router.push(link)).catch(err => {
				alert('connection failed')
				return
			})
		}else {
			router.push(link)
		}
	}

	return (
		<Menu.Item>
			<button
				type='button'
				className={`${
					isRead ? 'bg-white' : 'bg-blue-50'
				} w-full flex items-start justify-start text-left block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 focus:outline-none`}
				onClick={handleNotification}
			>
				<div className='flex-shrink-0'>
					<BellIcon className='h-6 w-6 text-blue-600 mt-0.5' aria-hidden='true' />
				</div>
				<div className='ml-3 w-0 flex-1'>
					<p className='text-sm font-medium text-gray-900'>{notif?.Title}</p>
					<p className='mt-1 text-sm text-gray-600'>{notif?.Content}</p>
				</div>
			</button>
		</Menu.Item>
	)
}
