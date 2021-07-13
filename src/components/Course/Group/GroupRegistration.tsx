import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { ModalContext } from "../../../contexts/ModalContext"
import GroupAgreement from "./GroupAgreement"
import Loading from "../Loading"
import Modal from "../Modal"

export default function GroupRegistration({studentGroupDetail, getGroupProject}) {

    const [userData, setUserData] = useContext(UserContext);
    const [modal, setModal] = useContext(ModalContext)
    const [studentsData, setStudentsData] = useState(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const createGroup = async (e) => {
      e.preventDefault();

      setLoading(true);

      let url = "https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetBinusian?";
      let studentsElement = document.querySelectorAll(".studentTxt");

      for(let i = 0; i < studentsElement.length; i++){
        let studentNIM = studentsElement[i] as HTMLInputElement;
        if(studentNIM.value == "" || studentNIM.value == undefined)
          continue;
         
        url += `binusian[]=${studentNIM.value}&`
      }

      url = url.substring(0, url.length - 1);

      const studentsData = await axios.get(url, {
        headers: {
          authorization: 'Bearer ' + userData.Token.token
        }
      })
      .then(res => res.data)

      setLoading(false);
      setStudentsData(studentsData);

      if(studentsData == null){
        setModal({show: true, message: "Make sure to input student's NIM properly!", error: true});
      }
      else {
        setOpen(true);
      }

    }


    return (
      <div className="flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
        <div className="">
          <h2 className="text-center text-3xl font-bold text-gray-900">Create your new Group Project</h2>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={createGroup}>

              {
                studentGroupDetail.Group.Students.map((student, idx) => (
                <div key={idx}>   
                  <label htmlFor={`student${idx + 1}`} className="block text-sm font-medium text-gray-700">
                    NIM Student {idx + 1}
                  </label>
                  <div className="mt-1">
                    {
                      idx == 0 ?
                      (
                        <input
                          id={`student${idx + 1}`}
                          name={`student${idx + 1}`}
                          type="text"
                          autoComplete=""
                          value={student.StudentNumber}
                          disabled
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-binus-blue focus:border-binus-blue sm:text-sm bg-gray-100 studentTxt"
                        />
                      )

                      :
                      
                      (
                        <input
                          id={`student${idx + 1}`}
                          name={`student${idx + 1}`}
                          type="text"
                          autoComplete=""
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-binus-blue focus:border-binus-blue sm:text-sm studentTxt"
                        />

                      )
                    }
                  </div>
                </div>
                ))
              }
  
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue transition ease-out duration-300"
                >
                  {
                    isLoading ? 
                    (
                      <Loading color="text-white" />
                    )
                    :
                    <></>
                  }
                  Create
                </button>
              </div>

            </form>
          </div>
        </div>

        <GroupAgreement  open={open} setOpen={setOpen} studentsData={studentsData} classTransactionId={studentGroupDetail.Group.ClassTransactionId} getGroupProject={getGroupProject}  />
        <Modal/>
      </div>
    )
  }
  