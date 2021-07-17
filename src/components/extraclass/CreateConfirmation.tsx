import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { formatDate, listShift } from '../../pages/api/helper'

export default function CreateConfirmation({ open, setOpen, callback, isLoading, data }) {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as='div' static className='fixed z-30 inset-0 overflow-y-auto' open={open} onClose={setOpen}>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
							<div>
								<div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100'>
									<ExclamationIcon className='h-6 w-6 text-yellow-600' aria-hidden='true' />
								</div>
								<div className='mt-3 text-center'>
									<Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
										Create Confirmation
									</Dialog.Title>
									<div className='py-2 border-b-2 border-gray-300'>
										<div className='font-medium mb-1 text-sm'>Assistant(s)</div>
										<div className='flex items-center justify-center mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2'>
											<p className='px-2 leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
												{data?.ExtraClass?.Assistant1}
											</p>
											{data?.ExtraClass?.Assistant2 != '' && (
												<p className='ml-2 px-2 leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
													{data?.ExtraClass?.Assistant2}
												</p>
											)}
										</div>
									</div>
                  <div className='py-2 border-b-2 border-gray-300'>
										<div className='font-medium mb-1 text-sm'>Course and Class</div>
										<div className='flex items-center justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
											<p className='px-2 leading-5 font-semibold text-gray-900'>
												{data?.ExtraClass?.Course}, {data?.ExtraClass?.Class}
											</p>
										</div>
									</div>
                  <div className='py-2 border-b-2 border-gray-300'>
										<div className='font-medium mb-1 text-sm'>Date and Time</div>
										<div className='flex items-center justify-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
											<p className='px-2 leading-5 font-semibold text-gray-900'>
												{`${listShift[data?.ExtraClass?.Shift - 1]?.Name}, ${formatDate(new Date(data?.ExtraClass?.ExtraClassDate))}`}
											</p>
										</div>
									</div>
                  <div className="mt-2 text-left">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to create this extra class? The Course and Class will not be able to change anymore!
                    </p>
                  </div>
								</div>
							</div>
							<div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
								<button
									type='button'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
									onClick={() => callback(data)}
								>
									{isLoading ? (
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
									) : null}
									Create
								</button>
								<button
									type='button'
									className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
									onClick={() => setOpen(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
