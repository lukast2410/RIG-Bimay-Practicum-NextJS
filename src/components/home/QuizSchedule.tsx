import axios from 'axios'
import { classNames, formatDate, formatNumber } from '../../pages/api/helper'
import LoadingProgressBar from '../Course/LoadingProgressBar'
import UploadedAnswer from './UploadedAnswer'
import { v1 as uuidv1 } from 'uuid'
import { useContext, useState } from 'react'
import { ModalContext } from '../../contexts/ModalContext'
import { UserContext } from '../../contexts/UserContext'
import Modal from '../Course/Modal'

export default function QuizSchedule({ quiz }) {
	const typeExam = quiz.Type
	const data = quiz.Data[0]
	const status = data.Present
	const endTimeDate = new Date(data.EndTime)
	const beginTimeDate = new Date(data.BeginTime)
	const endTime = `${formatNumber(endTimeDate.getHours())}:${formatNumber(endTimeDate.getMinutes())}:${formatNumber(endTimeDate.getSeconds())}`
	const beginTime = `${formatNumber(beginTimeDate.getHours())}:${formatNumber(beginTimeDate.getMinutes())}:${formatNumber(beginTimeDate.getSeconds())}`
	const steps = [
		{
			id: '01',
			name: 'Download Case',
			description: ['You can download your exam case here.'],
			href: `https://laboratory.binus.ac.id/lab/User/Case/${data?.File}`,
			status: 'link',
		},
		{
			id: '02',
			name: 'Extract Case File',
			description: ['After download your exam case, please extract (.zip) file to access the exam case.'],
			href: '#',
			status: 'info',
		},
		{
			id: '03',
			name: 'Compress Your Answer',
			description: [
				'Make sure you have saved your answers to D: Drive.',
				'If you have finished your case, close all programs, compress your answer in a (.zip) file.',
			],
			href: '#',
			status: 'info',
		},
		{
			id: '04',
			name: 'Submit Answer Here',
			description: [
				'If you have already finished your answer, you can submit it again (the previous file(s) will be overridden)',
			],
			href: '#',
			status: 'file',
		},
	]

	const [userData, setUserData] = useContext(UserContext)
	const [counter, setCounter] = useState(1)
	const [isLoading, setLoading] = useState(false)
	const [totalCounter, setTotalCounter] = useState(1)
	const [modal, setModal] = useContext(ModalContext)
	const [uploadPercentage, setUploadPercentage] = useState(0)
	const [loadingProgressBar, setLoadingProgressBar] = useState(false)

	const uploadDate = data.Data.UploadDate ? new Date(data.Data.UploadDate) : null
	const answerStatus = data.Data.Status
	const uploadData = data.Data
	const course = userData?.Courses.find((x) => x.Subject == uploadData.CourseName)
	const modifiedDate = new Date(uploadData.Files[0].DateModified)
	const modified = `${formatDate(modifiedDate)} ${formatNumber(modifiedDate.getHours())}:${formatNumber(
		modifiedDate.getMinutes()
	)}:${formatNumber(modifiedDate.getSeconds())}`

	const semester = userData?.Semesters.find((s) => s.SemesterId === userData.SemesterId)
	const semesterName = semester?.Description.replace('/', '-')

	const getCurrentTimeUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}general/time`
	const oneDriveTokenUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Account/GetOneDriveToken`
	const uploadUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}binusmaya/file`

	const uploadAnswer = async (event) => {
		setLoading(true)
		setLoadingProgressBar(true)

		const currentTime = await axios.get(getCurrentTimeUrl).then((res) => res.data)

		if (new Date(currentTime).getTime() > new Date(data.EndTime).getTime()) {
			setLoading(false)
			setLoadingProgressBar(false)
			setModal({
				show: true,
				message: 'Cannot upload the answer! Already passed the deadline!',
				error: true,
			})
			return
		}

		const { token } = await axios
			.get(oneDriveTokenUrl, {
				headers: {
					authorization: `Bearer ${userData.Token.token}`,
				},
			})
			.then((res) => res.data)

		let type = 'Assignment'
		if (typeExam == 'Exam') {
			type = 'Exam'
		}

		const path = `/lab/${semesterName}/${type}/${
			uploadData.CourseName.split('-')[0]
		}/${uploadData.ClassName.replace(' ', '')}/${userData.Data.UserName}`

		const file = event.target.files[0]
		const fileName = file.name.split('.')[0]
		const fileExt = file.name.split('.')[1]

		const options = {
			path,
			fileName: `${fileName}_${uuidv1()}.${fileExt}`,
			rangeSize: 10 * 1024 * 1024,
		}

		setTotalCounter(Math.ceil(file.size / options.rangeSize))

		const urlGraph = `https://graph.microsoft.com/v1.0/me/drive/root:${options.path}/${options.fileName}:/createUploadSession`

		const payload = {
			item: {
				'@microsoft.graph.conflictBehavior': 'replace',
				'@odata.type': 'microsoft.graph.driveItemUploadableProperties',
				name: fileName,
			},
		}

		const urlGraphResponse = await axios
			.put(urlGraph, payload, {
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data)

		const minBytes = 0,
			maxBytes = options.rangeSize - 1

		const res = await uploadBytes(
			token,
			urlGraphResponse.uploadUrl,
			file,
			minBytes,
			maxBytes,
			options.rangeSize
		)

		const Url = res.downloadURL
		const lastModifiedDateTime = res.lastModifiedDateTime
		const hash = res.hash
		const size = file.size
		const resFileName = res.fileName

		const uploadPayload = {
			Type: type,
			Number: uploadData.AssignmentNumber,
			Url,
			Hash: hash,
			FileName: resFileName,
			Size: size,
			DateModified: lastModifiedDateTime,
			UploadTime: currentTime,
			ClassTransactionId: course.ClassTransactionId,
		}

		const result = await axios
			.post(uploadUrl, uploadPayload, {
				headers: {
					authorization: `Bearer ${userData.Token.token}`,
				},
			})
			.then((res) => res.data)

		const requestData = {
			fileItemId: result.Task.FileId,
			source: Url
		}

		let urlUploadFile = 'User/Upload/' + requestData.fileItemId

		const test = await axios.post(`${process.env.NEXT_PUBLIC_LABORATORY_URL}${urlUploadFile}`, requestData, {
			headers: {
				authorization: userData.Token.token
			}
		}).then(res => res.data)

		setLoading(false)
		setLoadingProgressBar(false)
		setUploadPercentage(0)

		setModal({
			show: true,
			message: 'Successfully uploaded your answer!',
			error: false,
		})
	}

	const uploadBytes = async (token, uploadUrl, file, minBytes, maxBytes, range) => {
		let count = 1
		let totalCount = Math.ceil(file.size / range)

		while (true) {
			if (maxBytes >= file.size) maxBytes = file.size

			const fileBlob = file.slice(minBytes, maxBytes)

			const response = await axios
				.put(uploadUrl, fileBlob, {
					headers: {
						'Content-Range': `bytes ${minBytes}-${maxBytes - 1}/${file.size}`,
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					onUploadProgress: function (progressEvent) {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
						setUploadPercentage(percentCompleted)
					},
				})
				.then((res) => res.data)

			if (response['nextExpectedRanges'] !== undefined) {
				minBytes = maxBytes
				maxBytes = minBytes + range
			}

			if (count < totalCount) {
				count++
				setCounter(count)
			}

			if (response['id'] !== undefined) {
				const fileId = response['id']
				const downloadURL = `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`
				const lastModifiedDateTime = response['lastModifiedDateTime']
				const hash = response['file']['hashes']['quickXorHash']
				const fileName = response['name']
				return {
					downloadURL,
					lastModifiedDateTime,
					hash,
					fileName,
				}
			}
		}
	}

	return (
		<div className='sm:-mt-1'>
			<LoadingProgressBar
				loadingProgressBar={loadingProgressBar}
				setLoadingProgressBar={setLoadingProgressBar}
				uploadPercentage={uploadPercentage}
				counter={counter}
				totalCounter={totalCounter}
			/>
			<Modal/>
			<div className='practicum-subject'>
				<dl className='mt-5 grid grid-cols-1 bg-white overflow-hidden rounded-lg border border-2 border-gray-500 divide-y divide-gray-500 md:grid-cols-3 md:divide-y-0 md:divide-x'>
					<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
						<dt className='text-medium sm:text-lg font-bold text-gray-600'>Subject</dt>
						<dd className='sm:mt-1'>
							<div className='sm:text-lg font-semibold text-black'>{data.Data.CourseName}</div>
						</dd>
					</div>
					<dl className='grid grid-cols-2 divide-x divide-gray-500'>
						<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
							<dt className='text-medium sm:text-lg font-bold text-gray-600'>Status</dt>
							<dd className='sm:mt-1'>
								<div
									className={`sm:text-lg font-bold ${
										status.toUpperCase() == 'PRESENT'
											? 'text-green-600'
											: status.toUpperCase() == 'LATE'
											? 'text-blue-600'
											: 'text-red-600'
									}`}
								>
									{status}
								</div>
							</dd>
						</div>
						<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
							<dt className='text-medium sm:text-lg font-bold text-gray-600'>Date</dt>
							<dd className='sm:mt-1'>
								<div className='sm:text-lg font-semibold text-black'>{formatDate(endTimeDate)}</div>
							</dd>
						</div>
					</dl>
					<dl className='grid grid-cols-2 divide-x divide-gray-500'>
						<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
							<dt className='text-medium sm:text-lg font-bold text-gray-600'>Start Time</dt>
							<dd className='sm:mt-1'>
								<div className='sm:text-lg font-semibold text-black'>{beginTime}</div>
							</dd>
						</div>
						<div className='py-3 px-4 md:py-5 md:px-6 text-center'>
							<dt className='text-medium sm:text-lg font-bold text-gray-600'>End Time</dt>
							<dd className='sm:mt-1'>
								<div className='sm:text-lg font-semibold text-black'>{endTime}</div>
							</dd>
						</div>
					</dl>
				</dl>
			</div>

			<div className='mt-5 grid grid-cols-1 divide-y-2 divide-gray-500 lg:grid-cols-2 lg:divide-x-2 lg:divide-y-0'>
				<div
					className={`pb-4 sm:px-3 sm:pt-2 lg:pl-3 lg:pr-6 lg:py-0 ${
						data.Data.UploadDate ? '' : 'col-span-2'
					}`}
				>
					<h3 className='text-xl leading-3 font-bold text-gray-900 mb-5 md:text-2xl md:leading-6'>{typeExam}</h3>
					<nav aria-label='Progress'>
						<ol className='overflow-hidden'>
							{steps.map((step, stepIdx) => (
								<li
									key={stepIdx}
									className={classNames(stepIdx !== steps.length - 1 ? 'pb-6' : '', 'relative')}
								>
									{stepIdx !== steps.length - 1 ? (
										<div
											className='-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-blue-500 sm:left-5'
											aria-hidden='true'
										/>
									) : null}
									{step.status == 'file' ? (
										<div className={`relative flex items-start group`}>
											<label htmlFor='upload' className='flex cursor-pointer'>
												<span className='z-0 h-8 flex items-center sm:h-10' aria-hidden='true'>
													<span className='text-sm relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-500 text-blue-500 font-medium rounded-full group-hover:text-blue-700 group-hover:border-blue-700 sm:w-10 sm:h-10'>
														{step.id}
													</span>
												</span>
												<span className='text-xs ml-2 min-w-0 flex flex-col sm:ml-4 sm:text-sm'>
													<span className='font-bold tracking-wide uppercase text-gray-600 group-hover:text-black'>
														{step.name}
													</span>
													{step.description.map((desc) => (
														<span key={desc} className='text-gray-500 font-medium group-hover:text-black'>
															{desc}
														</span>
													))}
												</span>
											</label>
											<input
												type='file'
												name='upload'
												id='upload'
												className='hidden'
												onChange={uploadAnswer}
											/>
										</div>
									) : (
										<a
											href={step.href}
											className={`${
												step.status != 'info' ? '' : 'cursor-default pointer-events-none'
											} relative flex items-start group`}
										>
											<span className='z-0 h-8 flex items-center sm:h-10' aria-hidden='true'>
												<span className='text-sm relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-500 text-blue-500 font-medium rounded-full group-hover:text-blue-700 group-hover:border-blue-700 sm:w-10 sm:h-10'>
													{step.id}
												</span>
											</span>
											<span className='text-xs ml-2 min-w-0 flex flex-col sm:ml-4 sm:text-sm'>
												<span className='font-bold tracking-wide uppercase text-gray-600 group-hover:text-black'>
													{step.name}
												</span>
												{step.description.map((desc) => (
													<span key={desc} className='text-gray-500 font-medium group-hover:text-black'>
														{desc}
													</span>
												))}
											</span>
										</a>
									)}
								</li>
							))}
						</ol>
					</nav>
				</div>

				{data.Data.UploadDate && <UploadedAnswer data={data.Data} />}
			</div>
		</div>
	)
}
