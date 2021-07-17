import Image from 'next/image'

export default function Identity({ user, isStudent }) {
	return (
		<div
			className={`max-w-screen-2xl mx-auto px-4 mb-2 mt-4 sm:px-6 sm:my-4 md:flex md:items-end lg:px-8 lg:my-6 ${
				isStudent ? 'md:justify-between' : 'justify-center'
			}`}
		>
			<div className={`flex flex-col items-center ${isStudent ? 'sm:flex-row sm:space-x-5' : ''}`}>
				<div className='flex-shrink-0'>
					<div className='relative'>
						<Image
						src={`${process.env.NEXT_PUBLIC_LABORATORY_URL}Account/GetThumbnail?id=${user?.Data.PictureId}`}
						width={144}
						height={144}
						loading="eager"
						className="object-cover object-top rounded-full"
						/>
						<span className='absolute inset-0 shadow-inner rounded-full' aria-hidden='true' />
					</div>
				</div>
				<div
					className={`flex text-center ${
						isStudent ? 'flex-col-reverse sm:flex-col sm:text-left' : 'flex-col'
					}`}
				>
					<h1 className='text-2xl font-bold text-binus-blue'>{user?.Data.Name}</h1>
					{isStudent ? (
						<p className='text-base font-medium text-gray-600'>{user?.Data.UserName}</p>
					) : (
						<>
							<h2 className='text-lg font-medium text-gray-900'>{user?.Data.UserName}</h2>
							<p className='text-base font-medium text-gray-600'>{user?.Data.Role}</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
