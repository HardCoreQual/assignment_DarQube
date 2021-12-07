import type {NextPage} from 'next'
import Head from 'next/head';
import {AppleNews} from "components/appleNews";

const AppleNewsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Apple News</title>
      </Head>

      <AppleNews />
    </>
  )
}

export default AppleNewsPage;
