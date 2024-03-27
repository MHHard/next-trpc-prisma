import Head from "next/head";
import RootLayout from "@/app/layout";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My Next App</title>
      </Head>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}

export default MyApp;
