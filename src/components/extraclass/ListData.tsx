import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function ListData({ label, listData, selectedData, setSelectedData }) {
	return (
		<Listbox value={selectedData} onChange={setSelectedData}>
			{({ open }) => (
				<>
					<Listbox.Label className='block text-sm font-medium text-gray-700'>{label}<strong className='text-red-700'>*</strong></Listbox.Label>
					<div className='mt-1 relative'>
						<Listbox.Button id={'adsanads'} className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-binus-blue focus:border-binus-blue sm:text-sm'>
							<span className='block truncate font-medium'>{selectedData.Name}</span>
							<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
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
													{data.Name}
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