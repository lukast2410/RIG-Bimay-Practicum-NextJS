import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { formatDate, formatNumber } from '../../pages/api/helper'

export default function UploadedAnswer({ data }) {
	const [userData, setUserData] = useContext(UserContext)
	const uploadDate = data.UploadDate ? new Date(data.UploadDate) : null
	const answerStatus = data.Status
	const modifiedDate = new Date(data.Files[0].DateModified)
	const modified = `${formatDate(modifiedDate)} ${formatNumber(modifiedDate.getHours())}:${formatNumber(
		modifiedDate.getMinutes()
	)}:${formatNumber(modifiedDate.getSeconds())}`
	const oneDriveTokenUrl = 'https://laboratory.binus.ac.id/lapi/api/Account/GetOneDriveToken'

	const getDownloadUrl = async (source) => {
		// setLoading(true)

		const { token } = await axios
			.get(oneDriveTokenUrl, {
				headers: {
					authorization: `Bearer ${userData.Token.token}`,
				},
			})
			.then((res) => res.data)

		const fileFromUrl = await axios
			.get(source, {
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data)

		// setLoading(false)
		router.push(fileFromUrl['@microsoft.graph.downloadUrl'])
	}

	return (
		<div className='pt-4 sm:px-3 sm:pb-2 lg:pl-6 lg:pr-3 lg:py-0'>
			<h3 className='text-xl leading-3 font-bold text-gray-900 mb-5 md:text-2xl md:leading-6'>Your Answer</h3>
			<div className='flex flex-col'>
				<span className='mb-1 font-bold'>
					Status:{' '}
					<span className={answerStatus == 'Pending' ? 'text-red-600' : 'text-green-600'}>
						{answerStatus}
					</span>
				</span>
				<span className='mb-1 font-bold'>
					Upload Date:{' '}
					<span className='text-blue-600'>{`${formatDate(uploadDate)} ${formatNumber(
						uploadDate.getHours()
					)}:${formatNumber(uploadDate.getMinutes())}:${formatNumber(uploadDate.getSeconds())}`}</span>
				</span>
				<span className='font-bold mb-1'>Files:</span>
				<div className='flex flex-col'>
					<div className='-my-2 overflow-x-auto'>
						<div className='py-2 align-middle inline-block max-w-full'>
							<table className='w-full bg-binus-blue table-fixed shadow rounded-md overflow-hidden'>
								<thead className='hidden bg-binus-blue sm:table-header-group'>
									<tr>
										<th
											scope='col'
											className='py-2 text-left text-sm font-medium text-white text-center tracking-wider w-1/2 '
										>
											File Name
										</th>
										<th
											scope='col'
											className='py-2 text-left text-sm font-medium text-white text-center tracking-wider w-1/4 '
										>
											Modified Date
										</th>
										<th
											scope='col'
											className='py-2 text-left text-sm font-medium text-white text-center tracking-wider w-1/4 '
										>
											Size
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									<tr className='table-row sm:hidden'>
										<th
											colSpan={2}
											className='py-2 pl-3 text-left text-sm font-medium text-white tracking-wider w-1/4 bg-binus-blue sm:text-center'
										>
											File Name
										</th>
										<td className='py-2 px-2 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black '>
											{data.Files[0].FileName}
										</td>
									</tr>
									<tr className='table-row sm:hidden'>
										<th
											colSpan={2}
											className='py-2 pl-3 text-left text-sm font-medium text-white tracking-wider w-1/4 bg-binus-blue sm:text-center'
										>
											Modified Date
										</th>
										<td className='py-2 px-2 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black '>
											{modified}
										</td>
									</tr>
									<tr className='table-row sm:hidden'>
										<th
											colSpan={2}
											className='py-2 pl-3 text-left text-sm font-medium text-white tracking-wider w-1/4 bg-binus-blue sm:text-center'
										>
											Size
										</th>
										<td className='py-2 px-2 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black '>
											{data.Size}
										</td>
									</tr>
									<tr className='hidden sm:table-row'>
										<td className='py-2 px-1.5 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm font-medium text-black'>
											{data.Files[0].FileName}
										</td>
										<td className='py-2 px-1.5 whitespace-nowrap overflow-ellipsis overflow-hidden text-center text-sm font-medium text-black'>
											{modified}
										</td>
										<td className='py-2 px-1.5 whitespace-nowrap overflow-ellipsis overflow-hidden text-center text-sm font-medium text-black'>
											{data.Size} bytes
										</td>
									</tr>
								</tbody>
							</table>
							<div className='flex items-start justify-between mt-2'>
								<div>
									<p className='mb-1 text-left font-bold text-gray-900 text-left'>
										File Size: {data.Size} byte(s)
									</p>
									<p className='text-left font-bold text-gray-900 text-left'>
										Total File: {data.Count} file(s)
									</p>
								</div>
								<div className='mr-1 ml-2 mt-0.5'>
									<button
										type='button'
										className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-binus-blue hover:bg-binus-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue'
										onClick={() => getDownloadUrl(data.Source)}
									>
										Download your answer here
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
