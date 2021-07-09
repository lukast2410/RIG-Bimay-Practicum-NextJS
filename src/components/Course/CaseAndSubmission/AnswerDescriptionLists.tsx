
import Link from 'next/link';
import DividerWithMessage from '../../home/DividerWithMessage';

export default function AnswerDescriptionLists({submittedAnswers}) {

  const getFormattedDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'Mei', 'June', 'July', 'August', 'September', 'October',
    'November', 'December']
    const d = new Date(date);
    let minutes;
    let seconds;
    let hours;

    d.getHours().toString().length == 1 ? hours = '0' + d.getHours() : hours = d.getHours();
    d.getMinutes().toString().length == 1 ? minutes = '0' + d.getMinutes() : minutes = d.getMinutes();
    d.getSeconds().toString().length == 1 ? seconds = '0' + d.getSeconds() : seconds = d.getSeconds();

    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${hours}:${minutes}:${seconds}`;
}

  return (
    <div className="mt-4 xl:hidden pb-2">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">
           Submitted Answer
      </h3>
      {
        submittedAnswers.length == 0 ?
        (
        <div className='py-4 px-5 rounded-md bg-red-50'>
            <DividerWithMessage message='There is no submitted answer for this subject' bg='red-50' size='lg' mt='' color='red-800'/>
        </div>
        )
        :
        submittedAnswers.map((answer, idx) => (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 rounded-md">
            <div className="px-3 py-3 sm:px-6 bg-binus-blue">
              <h3 className="text-lg leading-6 font-medium text-white">{answer.Type}-{answer.Number}</h3>
            </div>
            <div className="border-t border-gray-200 px-4 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{answer.StatusFile}</dd>
                </div>
                <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Uploaded By</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{answer.Uploader}</dd>
                </div>
                <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Uploaded Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{getFormattedDate(answer.UploadDate)}</dd>
                </div>
                <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Finalized By</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {answer.FinalizedBy == null ? '-' : answer.FinalizedBy}</dd>
                </div>
                <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Finalized Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {answer.FinalizedDate == null ? '-' : getFormattedDate(answer.FinalizedDate)}
                  </dd>
                </div>
                <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Hash Code</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{answer.Hash}</dd>
                </div>
                <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">File Size (Bytes)</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{answer.TotalSize}</dd>
                </div>
                <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Action</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <Link href={answer.Source}>
                        <button type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Download
                        </button>
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))
      }
    </div>
  )
}
