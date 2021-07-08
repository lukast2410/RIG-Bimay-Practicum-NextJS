import axios from 'axios';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
	const { semester } = await req.body;
	const user = req.session.get('user');
	const getCoursesUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Binusmaya/GetSchedule?SemesterId=`;

	try {
		user.SemesterId = semester
		req.session.set('user', user);
		await req.session.save();
		res.json(user);
	} catch (error) {
		const { response: fetchResponse } = error;
		res.status(fetchResponse?.status || 505).json(error.data);
	}
});
