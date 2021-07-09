import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { UserContext } from '../../../contexts/UserContext'
import { ErrorModalContext } from '../../../contexts/ErrorModalContext'

export default function GroupRegistrationModal({setOpen, openRegistrationModal, setOpenRegistrationModal, studentsData, classTransactionId, getGroupProject}) {

  const cancelButtonRef = useRef()
  const [userData, setUserData] = useContext(UserContext);
  const url = 'https://laboratory.binus.ac.id/lapi/api/Binusmaya/SaveGroupConfirmation'
  const [isLoading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useContext(ErrorModalContext);

  const createGroup = async () => {

    setLoading(true);

    const students = studentsData.map((student) => {
      return {
        Name: student.Name,
        StudentNumber: student.Number
      }
    })

    const payload = {
      ClassTransactionId: classTransactionId,
      Students: students
    }

    const responseData = await axios.post(url, payload, {
      headers: {
        authorization: 'Bearer ' + userData.Token.token
      }
    })
    .then(res => res.data);

    setLoading(false);
    setOpenRegistrationModal(false);
    setOpen(false);
    
    if(!responseData.Status){
      setErrorModal({show: true, message: responseData.Message})
    }
    else {
        getGroupProject();
    }

  }

  return (

    <Transition.Root show={openRegistrationModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={openRegistrationModal}
        onClose={setOpenRegistrationModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                    <ExclamationIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Are you sure to form this group?
                  </Dialog.Title>
                  <div className="mt-2">
                  <div className="flow-root mt-6">
                        <ul className="-my-5 divide-y divide-gray-200">
                          {studentsData && studentsData.map((student, idx) => (
                              <li key={idx} className="py-5 " >
                                <div className="relative focus-within:ring-2 focus-within:ring-binus-blue">
                                    <h3 className="text-sm font-semibold text-gray-800">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                        {student.Number}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{student.Name}</p>
                                </div>
                              </li>
                          ))}
                          <li className="py-3"></li>
                        </ul>
                        <div className="divide-y divide-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-binus-blue text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue sm:col-start-2 sm:text-sm"
                  onClick={createGroup}
                >
                  {
                    isLoading 
                    ?
                    (
                     <svg className="animate-spin h-5 w-5 -ml-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    )
                    :
                    <></>
                  }
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    setOpenRegistrationModal(false);
                  }}
                  ref={cancelButtonRef}
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
