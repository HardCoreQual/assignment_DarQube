import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head';
import {AppleNews, AppleNewsProps} from "components/appleNews";
import axios from "axios";
import {AppleOneNewsType} from "types/appleNews";

export const getServerSideProps: GetStaticProps<AppleNewsProps> = async () => {
  const news = await axios.get<AppleOneNewsType[]>((process.env as any).NEWS_SOURCE).then(resp => resp.data);

  return {
    props: {
      news: news.sort((a,b) => a.datetime - b.datetime)
    }
  }
}

const AppleNewsPage: NextPage<AppleNewsProps> = (props) => {
  return (
    <>
      <Head>
        <title>Apple News</title>
      </Head>

      <AppleNews {...props} />
    </>
  )
}

export default AppleNewsPage;
