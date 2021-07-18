import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import router from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function ExamConfirmation() {
  const [user, setUser] = useContext(UserContext)
  const [hidden, setHidden] = useState(false)
  const [first, setFirst] = useState(true)
  const [second, setSecond] = useState(true)
  const canConfirm = first && second

  const handleConfirm = async () => {
    if(!canConfirm) return

    const result = await axios.get(`${process.env.NEXT_PUBLIC_LABORATORY_URL}ConfirmExam?number=${''}&examId=${''}`, {
      headers: {
        authorization: `Bearer ${user.Token.token}`
      }
    }).then(res => res.data)
    console.log(result)
    router.push(router.asPath)
  }

	return (
		<div className={`${hidden ? 'hidden' : ''} border-dashed border-t-2 border-b-2 border-gray-400 py-3 mt-3 sm:ml-2 sm:border-none sm:p-0`}>
			<div className='mb-2 sm:mb-4'>
				<h1 className='text-base sm:text-lg leading-3 font-bold text-red-600'>
					Confirm the following conditions.
				</h1>
				<p className='text-xs sm:text-sm italic font-medium text-gray-500'>
					Konfirmasi kondisi-kondisi berikut
				</p>
			</div>
			<div className='relative flex items-start my-1 sm:ml-3 sm:my-2'>
				<div className='flex items-center h-5 pt-1'>
					<input
						id='first_condition'
						name='first_condition'
						type='checkbox'
						className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
						defaultChecked={first}
            onChange={() => setFirst(!first)}
					/>
				</div>
				<div className='ml-3 text-sm'>
					<label htmlFor='first_condition' className='font-medium'>
						<p className='text-blue-700 sm:text-base align-top font-bold'>
							I bring my "Course Card" containing "Subject" and "Semester" as stated above
						</p>
						<p className='text-xs sm:text-sm text-gray-500 italic'>
							Saya membawa "Kartu Mata Kuliah" yang berisi "Matakuliah" dan "Semester" sesuai yang tertera di
							atas
						</p>
					</label>
				</div>
			</div>
			<div className='relative flex items-start sm:ml-3 my-2'>
				<div className='flex items-center h-5 pt-1'>
					<input
						id='second_condition'
						name='second_condition'
						type='checkbox'
						className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
						defaultChecked={second}
            onChange={() => setSecond(!second)}
					/>
				</div>
				<div className='ml-3 text-sm'>
					<label htmlFor='second_condition' className='font-medium'>
						<p className='text-blue-700 sm:text-base align-top font-bold'>
							I bring my "Binusian Card" containing "ID" and "Name" as stated above
						</p>
						<p className='text-xs sm:text-sm text-gray-500 italic'>
							Saya membawa "Kartu Binusian" yang berisi "NIM" dan "Nama" sesuai yang tertera di atas
						</p>
					</label>
				</div>
			</div>
			<div className='mt-5 flex justify-start flex-row-reverse sm:flex-row'>
				<span className='block'>
					<button
						type='button'
						className={`${canConfirm ? 'bg-blue-600 hover:bg-blue-700 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500' : 'bg-blue-300 cursor-default'} inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2`}
            disabled={!canConfirm}
            onClick={handleConfirm}
					>
						<CheckCircleIcon className='-ml-1 mr-2 h-5 w-5 text-white' aria-hidden='true' />
						Confirm
					</button>
				</span>
				<span className='block mr-3 sm:ml-3'>
					<button
						type='button'
						className='inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500'
            onClick={() => setHidden(true)}
					>
						<XCircleIcon className='-ml-1 mr-2 h-5 w-5 text-white' aria-hidden='true' />
						Cancel
					</button>
				</span>
			</div>
		</div>
	)
}
