import Link from 'next/link';

export default function SessionMaterial({sessionDetail, classTransactionId, vbl}) {

    const getFormattedDate = (date: string) => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const d = new Date(date)
      return `${days[d.getDay()]}, ${d.getDate()} ${d.toString().split(' ')[1]} ${d.getFullYear()}`;
    }

    return (
      <div className="flex flex-col hidden lg:block pb-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-binus-blue">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Session
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Topics
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Room
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Shift
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Practicum Case
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Video Learning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessionDetail.map((material, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.Session}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getFormattedDate(material.Date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                          {material.Topic}
                          <ul className="divide-y divide-gray-200 list-disc">
                                {
                                    material.SubTopics.map((m, idx) => (
                                        <li className="py-4 flex" key={idx}>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-900">{m.Value}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.Room === "" ? "-" : material.Room}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.Shift}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {
                          material.CaseId == "00000000-0000-0000-0000-000000000000"
                          ?
                          (
                            <p>No File</p>
                          )
                          :
                          (
                            <Link href={`https://bluejack.binus.ac.id/binusmayalab/Laboratory/GetCase/${classTransactionId}/${material.Session}/${material.CaseId}`}>
                              <button type="button" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue">
                                Download Case
                              </button>
                            </Link>
                          )
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {
                          !vbl[idx] || !vbl[idx].URL || vbl[idx].URL == ''
                          ?
                          (
                            <p>No Video</p>
                          )
                          :
                          (
                            <Link href={vbl[idx].URL}>
                              <button type="button" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue">
                                Link Video
                              </button>
                            </Link>
                          )
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}
  