import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head';
import {AppleNews, AppleNewsProps} from "components/appleNews";
import axios from "axios";
import {AppleOneNewsType} from "types/appleNews";
import store, {useAppDispatch} from "../store/store";
import {Provider} from "react-redux";
import {useEffect, useState} from "react";
import {newsActions} from "../store/news";

export const getServerSideProps: GetStaticProps<AppleNewsProps> = async () => {
  const news = await axios.get<AppleOneNewsType[]>('/api/news').then(resp => resp.data);

  return {
    props: {
      news: news.sort((a,b) => b.datetime - a.datetime)
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
