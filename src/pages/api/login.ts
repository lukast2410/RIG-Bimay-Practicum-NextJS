import axios from 'axios';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
	const { username, password, role } = await req.body;
	const loginUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Account/LogOnBinusian`;
	const getSemesterUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Binusmaya/GetSemester`;
	const astLoginUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Account/LogOnQualification`;
	const getAllSemesterUrl = `${process.env.NEXT_PUBLIC_LABORATORY_URL}Schedule/GetSemesters`;

	try {
		let user = {}
		if(role == 'Student'){
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
					.get(
						process.env.NEXT_PUBLIC_LABORATORY_URL + 'Binusmaya/GetSchedule?SemesterId=' + smt[0].SemesterId,
						{
							headers: {
								authorization: 'Bearer ' + data.Token.token,
							},
						}
					)
					.then((res) => {
						return res.data
					})
	
			user = {
				isLoggedIn: true,
				SemesterId: smt[0].SemesterId,
				Courses: courses,
				Data: data.User,
				Token: data.Token,
			};
		}else if(role == 'Assistant'){
			const [data, smt] = await Promise.all([
				axios.post(astLoginUrl, {
					username: username,
					password: password
				}).then(res => res.data),
				axios.get(getAllSemesterUrl).then(res => res.data )
			])

			const name = data.User.Name
			data.User.Name = data.User.UserName
			data.User.UserName = name
			let date = new Date()
			date.setDate(date.getDate() + 1)

			const token = {
				token: data.Token.access_token,
				expires: date.toString()
			}

			user = {
				isLoggedIn: true,
				SemesterId: smt[0].SemesterId,
				Data: data.User,
				Token: token,
			};
		}
		req.session.set('user', user);
		await req.session.save();
		res.json(user);
	} catch (error) {
		const { response: fetchResponse } = error;
		res.status(fetchResponse?.status || 505).json(error.data);
	}
});
