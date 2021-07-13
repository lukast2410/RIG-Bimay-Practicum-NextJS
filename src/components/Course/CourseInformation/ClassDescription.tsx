import Link from "next/link";

export default function ClassDescription({ subject, onlineTask }) {

  const weekDay = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <li className="col-span-1 flex flex-col xl:flex-row shadow-md rounded-md mx-auto sm:w-full md:w-auto h-full">
      <div className="flex-shrink-0 flex items-center justify-center w-full xl:w-16 text-white text-sm font-medium text-gray-900 py-2 border xl:rounded-l-md rounded-t-md xl:rounded-t-none">
        {subject.Class}
      </div>
      <div className="flex-auto flex items-center justify-between border-t border-r border-b border-gray-200 bg-white truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate text-center">
          <p className="text-gray-900 font-medium hover:text-gray-600">
            {weekDay[subject.Day - 1]}
          </p>
          <p className="text-gray-500">{subject.Shift}</p>
        </div>
      </div>
      <div className="flex-none flex items-center justify-between border-t border-r border-b border-gray-200 bg-white truncate rounded-b-md xl:rounded-b-none xl:rounded-r-md">
        <div className="flex-1 px-4 py-2 text-sm truncate text-center">
          {
              onlineTask.length != 0
              ?
              (
                  <div>
                    <h4 className="text-lg leading-6 font-medium text-gray-900">
                        You have project task in this practicum
                    </h4>
                    <div className="mt-3 text-sm">
                        <Link href={`/course/${subject.Subject}/case-submission`}>
                        <a
                            href="#"
                            className="font-medium text-binus-blue hover:text-indigo-500"
                        >
                            Learn more about project <span aria-hidden="true">&rarr;</span>
                        </a>
                        </Link>
                    </div>
                  </div>
              )
              :
              (
                <div>
                    <h4 className="text-md leading-6 font-medium text-gray-900 xl:max-w-1/4 whitespace-normal">
                    You don't have any project task in this practicum
                    </h4>
                </div>
              )
          }
        </div>
      </div>
    </li>
  );
}
