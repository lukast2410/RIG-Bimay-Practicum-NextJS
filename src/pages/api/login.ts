import axios from 'axios';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
	const { username, password } = await req.body;
	const loginUrl = `https://laboratory.binus.ac.id/lapi/api/Account/LogOnBinusian`;
	const getSemesterUrl = `https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetSemester`;
	const getCoursesUrl = `https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetSchedule?SemesterId=`;

	try {
		const data = await axios
			.post(loginUrl, {
				username: username,
				password: password,
			})
			.then((res) => {
				return res.data;
			});

		const smt = await axios
			.get(getSemesterUrl, {
				headers: {
					authorization: 'Bearer ' + data.Token.token,
				},
			})
			.then((res) => {
				return res.data;
			});

		const courses = await axios
			.get(getCoursesUrl + smt[0].SemesterId, {
				headers: {
					authorization: 'Bearer ' + data.Token.token,
				},
			}).then(res => {
				return res.data
			})

		const user = {
			isLoggedIn: true,
			SemesterId: smt[0].SemesterId,
			Semesters: smt,
			Courses: courses,
			Data: data.User,
			Token: data.Token,
		};
		req.session.set('user', user);
		await req.session.save();
		res.json(user);
	} catch (error) {
		const { response: fetchResponse } = error;
		res.status(fetchResponse?.status || 505).json(error.data);
	}
});
