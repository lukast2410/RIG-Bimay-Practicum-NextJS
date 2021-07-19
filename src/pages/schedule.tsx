import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import withSession from "../lib/session";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import ScheduleTable from "../components/schedule/ScheduleTable";
import ScheduleList from "../components/schedule/ScheduleList";

export default function Schedule({ user, schedule, time }) {
    const [userData, setUserData] = useContext(UserContext);

    useEffect(() => setUserData(user), [user]);

    if (!user || !user.isLoggedIn) {
        return <h1>Loading...</h1>;
    }

    function filterSchedule(): void {
        schedule = schedule.filter((item) => {
            const currDate = new Date(time);
            const itemDate = new Date(item.Date);
            const itemTime = item.Time.substring(0, 5).split(":");

            var parsedHour: number = +itemTime[0];
            var parsedMinute: number = +itemTime[1];
            itemDate.setHours(parsedHour, parsedMinute + 120, 0, 0);
            return itemDate.getTime() > currDate.getTime();
        });
    }
    filterSchedule();

    return (
        <Layout title="Schedule">
            <div className="hidden sm:block">
                <ScheduleTable schedule={schedule} />
            </div>
            <div className="sm:hidden">
                <ScheduleList schedule={schedule} />
            </div>
        </Layout>
    );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const userData = req.session.get("user");
    if (!userData || Date.now() >= new Date(userData.Token.expires).getTime()) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
    const token = userData?.Token.token;

    const getCurrentTimeUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}general/time`;
    const [courses, smt, time] = await Promise.all([
        axios
            .get(process.env.NEXT_PUBLIC_LABORATORY_URL + "Binusmaya/GetSchedule?SemesterId=" + userData.SemesterId, {
                headers: {
                    authorization: "Bearer " + token,
                },
            })
            .then((res) => res.data),
        axios
            .get(process.env.NEXT_PUBLIC_LABORATORY_URL + "Binusmaya/GetSemester", {
                headers: {
                    authorization: "Bearer " + token,
                },
            })
            .then((res) => res.data),
        axios.get(getCurrentTimeUrl).then((res) => res.data),
    ]);

    const url = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Binusmaya/GetScheduleDetail`;
    const courseDetail: any = await Promise.all(
        courses.map((x) =>
            axios
                .get(url, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    data: {
                        SemesterId: userData.SemesterId,
                        ClassTransactionId: x.ClassTransactionId,
                        CourseOutlineId: x.CourseOutlineId,
                    },
                })
                .then((res) => res.data)
        )
    );
    const softwareCourse = courses.filter((course) => course.Laboratory === "Software");

    interface items {
        CourseName?: string;
        Date?: string;
        Time?: string;
        Class?: string;
        Room?: string;
        Session?: string;
        URL?: string;
        SessionTopic?: string;
    }

    function createItem(item: items): {
        CourseName: string;
        Date: string;
        Time: string;
        Class: string;
        Room: string;
        Session: string;
        URL?: string;
        SessionTopic: string;
    } {
        let newItem = {
            CourseName: item.CourseName,
            Date: item.Date,
            Time: item.Time,
            Class: item.Class,
            Room: item.Room,
            Session: item.Session,
            URL: item?.URL,
            SessionTopic: item.SessionTopic,
        };
        if (item.CourseName) {
            return newItem;
        } else {
            return null;
        }
    }

    let schedule = [];
    for (let i = 0; i < courses.length; i++) {
        for (let j = 0; j < courseDetail[i].SessionDetail.length; j++) {
            let CourseName = courses[i].Subject;
            let Date = courseDetail[i].SessionDetail[j].Date;
            let Time = courseDetail[i].SessionDetail[j].Shift;
            let Class = courses[i].Class;
            let Room = courseDetail[i].SessionDetail[j].Room;
            let Session = courseDetail[i].SessionDetail[j].Session;

            let URL = "/#";
            if (courseDetail[i].SessionDetail[j].Meeting?.URL != null)
                URL = courseDetail[i].SessionDetail[j].Meeting?.URL;

            let SessionTopic: string = courseDetail[i].SessionDetail[j].Topic;
            if (SessionTopic.includes("Quiz")) SessionTopic = "Quiz";
            else if (SessionTopic.includes("Project")) SessionTopic = "Project";
            else {
                courseDetail[i].SessionDetail[j].SubTopics.forEach((x) => {
                    if (x.Value.includes("Quiz")) {
                        SessionTopic = "Quiz";
                        return;
                    } else if (x.Value.includes("Project")) {
                        SessionTopic = "Project";
                        return;
                    }
                });
            }

            schedule.push(createItem({ CourseName, Date, Time, Class, Room, Session, URL, SessionTopic }));
        }
    }

    function sortScheduleByDefault(): void {
        schedule.sort((date1: items, date2: items) => {
            const a = new Date(date1.Date);
            const b = new Date(date2.Date);
            const c = date1.Time.substring(0, 5).split(":");
            const d = date2.Time.substring(0, 5).split(":");

            var parsedHour: number = +c[0];
            var parsedMinute: number = +c[1];
            a.setHours(parsedHour);
            a.setMinutes(parsedMinute);

            parsedHour = +d[0];
            parsedMinute = +d[1];
            a.setHours(parsedHour);
            a.setMinutes(parsedMinute);

            return a.getTime() - b.getTime();
        });
    }

    sortScheduleByDefault();

    const user = {
        ...userData,
        Semesters: smt,
        Courses: softwareCourse,
    };

    return {
        props: {
            user,
            schedule,
            time,
        },
    };
});
