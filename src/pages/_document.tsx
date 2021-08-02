import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta name='application-name' content='Binusmaya Practicum' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='apple-mobile-web-app-status-bar-style' content='default' />
					<meta name='apple-mobile-web-app-title' content='Binusmaya Practicum' />
					<meta name='theme-color' content='#ffffff' />

					<link rel='apple-touch-icon' href='/assets/logo-binus.png' />

					<link rel='manifest' href='/manifest.json' />
					<link rel='shortcut icon' href='/static/favicon.ico' />
					<meta charSet='UTF-8' />
					<meta name='author' content='GB18-2 Jonathan Gobiel, LT20-1 Lukas Tanto Kurniawan, DX20-1 Adrian, CV20-1 Calvin Arihta'/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
