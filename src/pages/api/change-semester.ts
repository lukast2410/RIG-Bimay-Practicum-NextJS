import axios from 'axios';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
	const { semester } = await req.body;
	const user = req.session.get('user');
	const getCoursesUrl = `https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetSchedule?SemesterId=`;

	try {
		user.SemesterId = semester
		const courses = await axios
			.get(getCoursesUrl + semester, {
				headers: {
					authorization: 'Bearer ' + user.Token.token,
				},
			}).then(res => {
				return res.data
			})

		user.Courses = courses
		req.session.set('user', user);
		await req.session.save();
		res.json(user);
	} catch (error) {
		const { response: fetchResponse } = error;
		res.status(fetchResponse?.status || 505).json(error.data);
	}
});
