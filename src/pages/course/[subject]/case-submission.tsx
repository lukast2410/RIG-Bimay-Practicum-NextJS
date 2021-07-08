import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import { UserContext } from "../../../contexts/UserContext";
import withSession from "../../../lib/session";
import Link from 'next/link';
import ClassDescription from "../../../components/Course/CourseInformation/ClassDescription";
import LearningOutcome from "../../../components/Course/CourseInformation/LearningOutcome";
import CaseSubmissionComponent from "../../../components/Course/CaseAndSubmission/CaseSubmission";
import SubmittedAnswer from "../../../components/Course/CaseAndSubmission/SubmittedAnswer";
import axios from "axios";
import CourseBreadcrumbs from "../../../components/Course/Breadcrumbs";
import NextNProgress from 'nextjs-progressbar'
import AnswerDescriptionLists from "../../../components/Course/CaseAndSubmission/AnswerDescriptionLists";
import SubmissionDescriptionLists from "../../../components/Course/CaseAndSubmission/SubmissionDescriptionLists";

export default function CaseSubmission({ user, subject, courseDetail }) {
	const [userData, setUserData] = useContext(UserContext)
	const [optionValue, setOptionValue] = useState(2);
	const section = useRef(null);

	useEffect(() => {
		setUserData(user);
		window.scrollTo({
			top: section.current.offsetTop,
		})
	}, [user])
	
	const urls = [
		`/course/${courseDetail.CourseOutlineDetail.CourseCode}-${courseDetail.CourseOutlineDetail.CourseName}/info`,
		`/course/${courseDetail.CourseOutlineDetail.CourseCode}-${courseDetail.CourseOutlineDetail.CourseName}/session-material`,
		`/course/${courseDetail.CourseOutlineDetail.CourseCode}-${courseDetail.CourseOutlineDetail.CourseName}/case-submission`,
		`/course/${courseDetail.CourseOutlineDetail.CourseCode}-${courseDetail.CourseOutlineDetail.CourseName}/group`
	]

	const addRedirectTabs = (event) => {
		Router.push(urls[event.target.value]);
		setOptionValue(event.target.value);
	}

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>;
	}

	return (
	<Layout title={courseDetail.CourseOutlineDetail.CourseName}>
		<NextNProgress options={{easing: 'ease', speed: 500}}/>
		<div className="max-w-screen-2xl mx-auto sm:px-6 lg:px-8 mt-5 px-4">
			<div className="course-description mb-3 text-center sm:text-left">
				<div className="flex justify-center sm:justify-start">
					<CourseBreadcrumbs courseOutlineDetail={courseDetail.CourseOutlineDetail}/>
				</div>
				<h1 className="text-3xl font-bold mb-4 mt-4">{courseDetail.CourseOutlineDetail.CourseName}</h1>
				<p>{courseDetail.CourseOutlineDetail.CourseDescription}</p>
			</div>
			<div className="course-content flex flex-col justify-between xl:flex-row">
				<div className="w-full mb-4 xl:w-3/5 xl:mb-0">
					<LearningOutcome learningOutcome={courseDetail.CourseOutlineDetail.LearningOutcome} />
				</div>
				<div className="flex-none">
					<ClassDescription subject={subject}/>
				</div>
			</div>
			<div className="course-tab mt-6">
				<div className="sm:hidden">
					<label htmlFor="tabs" className="sr-only">Select a tab</label>
						<select id="tabs" name="tabs" className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" onChange={addRedirectTabs} value={optionValue}>
							<option className="options" value={0}>Info</option>

							<option className="options" value={1}>Session & Material</option>

							<option className="options" value={2}>Case & Submission</option>

							<option className="options" value={3}>Group Forming</option>
						</select>
				</div>
				<div className="hidden sm:block" ref={section}>
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex" aria-label="Tabs">
							<Link href={urls[0]}>
								<a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
								Info
								</a>
							</Link>

							<Link href={urls[1]}>
								<a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
								Session & Material
								</a>
							</Link>

							<Link href={urls[2]}>
								<a href="#" className="border-binus-blue text-binus-blue w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm" aria-current="page">
								Case & Submission
								</a>
							</Link>
							
							<Link href={urls[3]}>
								<a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
								Group Forming
								</a>
							</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="session-material mt-6" >
				<SubmissionDescriptionLists onlineTasks={courseDetail.OnlineTasks} />
				<CaseSubmissionComponent onlineTasks={courseDetail.OnlineTasks} submittedAnswers={courseDetail.SubmitedAnswers}/>
				<AnswerDescriptionLists submittedAnswers={courseDetail.SubmitedAnswers}/>
				<SubmittedAnswer submittedAnswers={courseDetail.SubmitedAnswers}/>
			</div>
		</div>
	</Layout>
	)
};

export const getServerSideProps = withSession(async function ({ req, res, query }) {
	const user = req.session.get('user');
		if (!user || Date.now() >= new Date(user.Token.expires).getTime()) {
			return {
				redirect: {
				destination: '/auth/login',
				permanent: false,
			},
	    };
    }

    const subject = user.Courses.find(x => x.Subject == query.subject)
        if (!subject) {
            return {
                redirect: {
                destination: '/',
                permanent: false,
                },
            };
    }

	const url = 'https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetScheduleDetail';
	const courseDetail = await axios.get(url, {
		headers: {
			authorization: `Bearer ${user.Token.token}`
		},
		data: {
			SemesterId: user.SemesterId,
			ClassTransactionId: subject.ClassTransactionId,
			CourseOutlineId: subject.CourseOutlineId
		}
	})
	.then(response => response.data);

    return {
        props: {
            user,
            subject,
			courseDetail
        },
    };
});