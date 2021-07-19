import Link from "next/link";
import { CalendarIcon, VideoCameraIcon } from "@heroicons/react/solid";

export default function ScheduleList({ schedule }) {
    const getFormattedDate = (date: string) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const d = new Date(date);
        return `${days[d.getDay()]}, ${d.getDate()} ${d.toString().split(" ")[1]} ${d.getFullYear()}`;
    };

    return (
        <div>
            {!schedule.length ? (
                <div className="overflow-hidden rounded-lg mx-2 my-4 p-4">
                    <div className="w-full bg-blue-200 text-center rounded-lg px-4 py-6">
                        <h1 className="text-blue-800 text-sm font-bold">There are no available schedule yet</h1>
                        <p className="text-blue-700 text-xs font-medium">
                            Remember to keep checking this page frequently, thank you.
                        </p>
                    </div>
                </div>
            ) : (
                <div>
                    {schedule.map((x, idx: number) => (
                        <div className="border-2 rounded-md mx-2 my-6" key={`scheduleList ${idx}`}>
                            <div className="p-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-blue-800">
                                        {x.CourseName.split("-")[0]} &nbsp;{" "}
                                    </p>
                                    <p className="text-sm font-medium text-blue-600">
                                        {x.SessionTopic === "Quiz" ? (
                                            <span className="bg-red-200 text-red-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                                Quiz
                                            </span>
                                        ) : x.SessionTopic === "Project" ? (
                                            <span className="bg-green-200 text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                                Project
                                            </span>
                                        ) : (
                                            <span className="bg-blue-200 text-blue-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                                Normal Class
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-600 truncate">
                                        {x.CourseName.split("-")[1]}
                                    </p>
                                </div>
                                <div className="flex items-end justify-between mt-2">
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            <span>Class : {x.Class}</span>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <span>Room : {x.Room === "" ? "-" : x.Room}</span>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <span>Shift : {x.Time}</span>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 text-center whitespace-nowrap">
                                            <CalendarIcon
                                                className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span>{getFormattedDate(x.Date)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            <Link href={x.URL}>
                                                <a
                                                    type="button"
                                                    className="inline-flex items-center p-2 border-transparent shadow-sm text-xs leading-4 font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
                                                    target="_blank"
                                                >
                                                    <VideoCameraIcon
                                                        className="-ml-0.5 mr-1 h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                    Join Meeting
                                                </a>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
