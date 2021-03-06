import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/main.scss';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Welcome to web-site!</title>
            </Head>
            <main className="app">
                <Component {...pageProps} />
            </main>
        </>
    );
};

export default App;
