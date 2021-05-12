import Head from 'next/head';
import Header from './Header';

export default function Layout({children, title}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Binusmaya Practicum for Lab"/>
            </Head>
            <Header/>
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
};



