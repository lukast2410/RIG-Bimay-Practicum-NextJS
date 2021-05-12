import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import { UserContext } from "../../contexts/UserContext";
import withSession from "../../lib/session";

export default function Subject({ user, subject }) {
    const [userData, setUserData] = useContext(UserContext)
	useEffect(() => setUserData(user), [user])
    const router = useRouter()
    const subjectInfo = router.query.subject.toString().split('-')

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>;
    }
    
    return (
        <Layout title={subjectInfo[1]}>
            Hai
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

	return {
		props: {
			user,
            subject
		},
	};
});
