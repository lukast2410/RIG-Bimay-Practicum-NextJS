import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NotifPagination({ end }) {
	const router = useRouter()
	const numbers = []
  for(let i = 1; i < end - 1; i++){
    numbers.push(i)
    if(i >= 5) break
  }

	const page = router.query.page && Number(router.query.page) > 1 ? Number(router.query.page) : 1
	const max = 7
	const middle = end > max && page > 5 && page < end - 4
	const first = end > max && !middle && page > 5
	const last = end > max && !middle && page < end - 4
	let start = middle ? page - 1 : first ? end - 4 : 2

	return (
		<nav className='border-t border-gray-200 pb-4 px-4 flex items-center justify-between sm:px-0'>
			<div className='-mt-px w-0 flex-1 flex'>
				<Link href={`/notification?page=${page - 1}`}>
					<a
						className={`${
							page == 1 ? 'pointer-events-none cursor-default' : 'hover:text-gray-700 hover:border-gray-300'
						} border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 `}
					>
						<ArrowNarrowLeftIcon className='mr-3 h-5 w-5 text-gray-400' aria-hidden='true' />
						Previous
					</a>
				</Link>
			</div>
			<div className='hidden md:-mt-px md:flex'>
				<Link href={`/notification?page=${1}`}>
					<a
						className={`${
							page == 1 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
						} border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
					>
						1
					</a>
				</Link>
				{numbers.map((x) => (
					<div key={x}>
						{x == 1 && (first || middle) ? (
							<span className='border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'>
								...
							</span>
						) : (
							<>
								{x == 5 && (last || middle) ? (
									<span className='border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'>
										...
									</span>
								) : (
									<Link href={`/notification?page=${start}`}>
										<a
											className={`${
												page == start
													? 'border-blue-500 text-blue-600'
													: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
											} border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
										>
											{start++}
										</a>
									</Link>
								)}
							</>
						)}
					</div>
				))}
				{end > 1 && (
					<Link href={`/notification?page=${end}`}>
						<a
							className={`${
								page == end ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
							} border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
						>
							{end}
						</a>
					</Link>
				)}
			</div>
			<div className='-mt-px w-0 flex-1 flex justify-end'>
				<Link href={`/notification?page=${page + 1}`}>
					<a
						className={`${
							page >= end ? 'pointer-events-none cursor-default' : 'hover:text-gray-700 hover:border-gray-300'
						} border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 `}
					>
						<ArrowNarrowRightIcon className='mr-3 h-5 w-5 text-gray-400' aria-hidden='true' />
						Next
					</a>
				</Link>
			</div>
		</nav>
	)
}
