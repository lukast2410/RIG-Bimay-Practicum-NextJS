import Alert from "../Alert";
import Answer from "./Answer";
import AnswerDescriptionLists from "./AnswerDescriptionLists";

export default function SubmittedAnswer({ submittedAnswers }) {
  const getFormattedDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "Mei",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(date);
    let minutes;
    let seconds;
    let hours;

    d.getHours().toString().length == 1
      ? (hours = "0" + d.getHours())
      : (hours = d.getHours());
    d.getMinutes().toString().length == 1
      ? (minutes = "0" + d.getMinutes())
      : (minutes = d.getMinutes());
    d.getSeconds().toString().length == 1
      ? (seconds = "0" + d.getSeconds())
      : (seconds = d.getSeconds());

    return `${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}, ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="mt-4 pb-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">
        Submitted Answer
      </h3>
      {submittedAnswers.length == 0 ? (
        <Alert message="There is no submitted answer for this subject." />
      ) : (
        <div>
          <AnswerDescriptionLists
            submittedAnswers={submittedAnswers}
            getFormattedDate={getFormattedDate}
          />
          <div className="hidden xl:block flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-binus-blue">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Uploaded By
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Uploaded Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Hash Code
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      { submittedAnswers.map((answer, idx) => (
                        <Answer
                          answer={answer}
                          idx={idx}
                          getFormattedDate={getFormattedDate}
                          key={idx} 
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
