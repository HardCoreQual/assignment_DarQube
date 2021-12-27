import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head';
import {AppleNews, AppleNewsProps} from "components/appleNews";
import store, {useAppDispatch} from "../store/store";
import {Provider} from "react-redux";
import {useEffect, useState} from "react";
import {newsActions} from "../store/news";
import {newsSource} from "../data/news";

export const getServerSideProps: GetStaticProps<AppleNewsProps> = async () => {
  return {
    props: {
      news: newsSource.sort((a,b) => b.datetime - a.datetime)
    }
  }
}

const AppleNewsPage: NextPage<AppleNewsProps> = (props) => {
  return (
    <>
      <Head>
        <title>Apple News</title>
      </Head>

      <Provider store={store}>
        <InitNews {...props} />
      </Provider>
    </>
  )
}

const InitNews = ({news}: AppleNewsProps) => {
  const [isInit, setIsInit] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(newsActions.setNews(news));
    setIsInit(true);
  }, [news]);

  return isInit ? <AppleNews /> : null;
}

export default AppleNewsPage;
