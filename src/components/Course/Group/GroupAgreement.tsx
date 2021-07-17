import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import GroupRegistrationModal from "./GroupRegistrationModal";

export default function GroupAgreement({
  open,
  setOpen,
  studentsData,
  classTransactionId,
  getGroupProject,
}) {
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const cancelButtonRef = useRef();
  const [error, setError] = useState(false);
  const termsAndRegulations = [
    `1. 
      You can't invite other students who have already form a group.`,
    `2. If one student refuses to accept the group formation then it will fail to other students who are in the same group with you.`,
    `3. The group will be formed when all students have accepted the formation.`,
    `4. Note that the group cannot be changed once the group has been formed.`,
  ];

  const createGroup = () => {
    if (!checkCheckbox()) return;

    
    // setOpen(false);
    setOpenRegistrationModal(true);
  };

  const checkCheckbox = () => {
    const checkbox = document.querySelector("#remember_me") as HTMLInputElement;
    if (!checkbox.checked) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
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
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
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
                  <ExclamationIcon
                    className="h-6 w-6 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Terms And Regulations
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flow-root mt-6">
                      <ul className="-my-5 divide-y divide-gray-200 text-left">
                        {termsAndRegulations.map((term, idx) => (
                          <li className="py-5" key={idx}>
                            <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                              <h3 className="text-sm font-semibold text-gray-800">
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                ></span>
                                {term}
                              </h3>
                            </div>
                          </li>
                        ))}
                        <li className="py-3"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-binus-blue focus:ring-binus-blue border-gray-300 rounded"
                  />
                  <label
                    htmlFor=""
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I Agree to Terms and Regulations
                  </label>
                </div>
              </div>

              {
                  error &&
                  (
                    <div className="flex items-center justify-center mx-auto w-4/5">
                        <ExclamationIcon
                        className="h-4 w-4 text-red-600"
                        aria-hidden="true"
                        />
                        <p className="text-red-500 text-sm ml-2">
                        You must agree to terms and regulations!
                        </p>
                  </div>
                  )
              }

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:col-start-2 sm:text-sm"
                  onClick={createGroup}
                >
                  Next
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>

              <GroupRegistrationModal
                setOpen={setOpen}
                openRegistrationModal={openRegistrationModal}
                setOpenRegistrationModal={setOpenRegistrationModal}
                studentsData={studentsData}
                classTransactionId={classTransactionId}
                getGroupProject={getGroupProject}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
