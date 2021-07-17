import Head from 'next/head';
import Header from './Header';
import NextNProgress from 'nextjs-progressbar';

export default function Layout({children, title}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Binusmaya Practicum for Lab"/>
            </Head>
            <NextNProgress
                color='#00a9e2'
                startPosition={0.7}
                stopDelayMs={200}
                height={3}
                options={{ easing: 'ease', speed: '300', showSpinner: false }}
            />
            <Header/>
            <main>
                <div>
                    {children}
                </div>
            </main>
        </>
    )
};
