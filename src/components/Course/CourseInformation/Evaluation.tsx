export default function Evaluation({theoryEvaluation, labEvaluation}){
    return(
        <div className="pb-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 text-center">
                Evaluation Component
            </h3>
            <div className="evaluation flex flex-col xl:flex-row justify-around">
                <div className="flex flex-col flex-1 xl:mr-4 mb-4">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg rounded-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-binus-blue text-center" colSpan={2}>
                                                Theory Evaluation
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                        {
                                            theoryEvaluation.map((data, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-center text-black">
                                                        {data.Activity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-center text-black">
                                                        {data.Weight}%
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 xl:ml-4">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg rounded-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-binus-blue text-center" colSpan={2}>
                                                Practicum Evaluation
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            labEvaluation.map((data, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-center text-black ">
                                                        {data.Activity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-center text-black">
                                                        {data.Weight}%
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}