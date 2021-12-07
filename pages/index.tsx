import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head';
import {AppleNews, AppleNewsProps} from "components/appleNews";
import axios from "axios";
import {AppleOneNewsType} from "types/appleNews";

export const getStaticProps: GetStaticProps<AppleNewsProps> = async () => {
  return {
    props: {
      news: await axios.get<AppleOneNewsType[]>((process.env as any).NEWS_SOURCE).then(resp => resp.data),
    }
  }
}

const AppleNewsPage: NextPage<AppleNewsProps> = ({news}) => {
  return (
    <>
      <Head>
        <title>Apple News</title>
      </Head>

      <AppleNews news={news} />
    </>
  )
}

export default AppleNewsPage;
