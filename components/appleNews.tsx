import {AppleOneNewsType} from "types/appleNews";
import {Navbar} from "components/navbar";
import {OneNews} from "components/oneNews";
import {useNewsSelector} from "../store/news";
import React, {useMemo} from "react";
import {NewsList, SpaceBetween} from "components/newsList";

export type AppleNewsProps = {
  news: AppleOneNewsType[]
}

export const AppleNews = () => {
  return <div css={`
    padding: 40px 13px 40px 31px;
    background-color: #242525;
    display: inline-block;
    width: 1398px;
    height: 1000px;
  `}>
    <div css={`height: calc(100% - 80px)`}>
      <Navbar />
      <AppleNewsDataBoard />
    </div>
  </div>
}

function searchInText(text: string, search: string) {
  return text.toLowerCase().includes(search.toLowerCase());
}

const MemoOneNewsComponent = React.memo(OneNews);

const AppleNewsDataBoard = () => {
  const news = useNewsSelector((state) => state.news);
  const isNewsMenu = useNewsSelector((state) => state.selectedMenu === 'news');
  const bookmarkIds = useNewsSelector((state) => state.bookmarkIds);
  const searchKeyword = useNewsSelector(state => state.search);
  const page = useNewsSelector((state) => state.page);

  const menuNews = isNewsMenu ? news.slice(1) : news.filter((e) => bookmarkIds.includes(e.id));

  const showNews = useMemo(() => {
    return menuNews.filter(e => searchInText(e.headline + ' ' + e.summary, searchKeyword));
  }, [menuNews, searchKeyword]);

  const pageLimit = 6;
  const offset = page * pageLimit;

  return <SpaceBetween>
    {isNewsMenu && news.length && (
      <div>
        <div css={`height: 100%`}>
          <MemoOneNewsComponent oneNews={news[0]} isMain={true} />
        </div>
      </div>
    )}

    <NewsList offset={offset} page={page} showNews={showNews} pageLimit={pageLimit} />
  </SpaceBetween>
}

