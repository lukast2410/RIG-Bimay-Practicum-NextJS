import { BellIcon, ChevronRightIcon } from '@heroicons/react/solid'
import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { formatDate } from '../../pages/api/helper'

export default function NotificationList({ notif }) {
	const [user, setUser] = useContext(UserContext)
	const isRead = notif.details[0].IsRead
	const link = notif.Type == 'ExtraClass' ? `/extra-class/${notif.ContentId}` : `/group`
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
		<li>
			<button
				type='button'
				className={`${
					isRead ? 'bg-white' : 'bg-blue-50'
				} w-full flex items-start justify-start text-left block text-sm cursor-pointer hover:bg-gray-200 focus:outline-none`}
        onClick={handleNotification}
			>
				<div className='w-full px-4 py-4 flex justify-between items-center sm:px-6'>
					<div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
						<div className='truncate'>
							<div className='flex items-center text-sm'>
								<BellIcon className='h-5 w-5 text-blue-700 mr-1.5' aria-hidden='true' />
								<p className='font-bold text-blue-500 truncate'>{notif.Title}</p>
                <span className='text-blue-700 px-1'>•</span>
                <span className='text-xs font-medium text-gray-500'>{formatDate(new Date(notif.LastUpdate))}</span>
							</div>
							<div className='mt-2 flex'>
								<div className='flex items-center text-sm text-gray-500'>
									<p className='whitespace-pre-wrap'>{notif.Content}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='ml-5 flex-shrink-0'>
						<ChevronRightIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</div>
				</div>
			</button>
		</li>
	)
}
