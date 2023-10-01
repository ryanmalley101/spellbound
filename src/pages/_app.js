import Amplify from "@aws-amplify/core";
import awsconfig from "../aws-exports";
import '../styles/globals.css'

Amplify.configure({...awsconfig, ssr: true});

function MyApp({Component, pageProps}) {
    return <Component {...pageProps} />;
}

export default MyApp;