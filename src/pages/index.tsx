import { useContext, useEffect } from 'react';
import withSession from '../lib/session';
import { UserContext } from '../contexts/UserContext';
import Layout from '../components/Layout';

export default function Home({ user }) {
	const [userData, setUserData] = useContext(UserContext)
	useEffect(() => setUserData(user), [user])

	if (!user || !user.isLoggedIn) {
		return <h1>Loading...</h1>;
	}

	return (
		<Layout title="Home">

		</Layout>
	);
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const user = req.session.get('user');

	if (!user || Date.now() >= new Date(user.Token.expires).getTime()) {
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			user,
		},
	};
});
