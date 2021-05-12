import { withIronSession } from 'next-iron-session'

const APPLICATION_SECRET = "91fbdc1a-a7d7-11eb-bcbc-0242ac130002"

export default function withSession(handler) {
  return withIronSession(handler, {
    password: APPLICATION_SECRET,
    cookieName: 'BinusmayaPracticumCookie',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
}