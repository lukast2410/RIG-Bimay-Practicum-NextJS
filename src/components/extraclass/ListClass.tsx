import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { classNames } from '../../pages/api/helper'

export default function ListClass({ label, listData, selectedData, setSelectedData, disable, isLoading }) {
	return (
		<Listbox value={selectedData} onChange={setSelectedData} disabled={disable}>
			{({ open }) => (
				<>
					<Listbox.Label className='flex text-sm font-medium text-gray-700'>
						{label}
						<strong className='text-red-700'>*</strong>
						{` `}
						{isLoading ? (
							<svg
								className='animate-spin h-5 w-5 ml-2 text-blue-700'
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
					</Listbox.Label>
					<div className='mt-1 relative'>
						<Listbox.Button
							className={`${
								disable ? 'bg-gray-200' : ''
							} cursor-pointer bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-binus-blue focus:border-binus-blue sm:text-sm`}
						>
							<span className='block truncate text-black'>{selectedData.ClassName}</span>
							<span className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
								<SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave='transition ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Listbox.Options
								static
								className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
							>
								{listData.map((data, idx) => (
									<Listbox.Option
										key={idx}
										className={({ active }) =>
											classNames(
												active ? 'text-white bg-binus-blue' : 'text-gray-900',
												'cursor-default select-none relative py-2 pl-3 pr-9'
											)
										}
										value={data}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
												>
													{data.ClassName}
												</span>

												{selected ? (
													<span
														className={classNames(
															active ? 'text-white' : 'text-binus-blue',
															'absolute inset-y-0 right-0 flex items-center pr-4'
														)}
													>
														<CheckIcon className='h-5 w-5' aria-hidden='true' />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	)
}
