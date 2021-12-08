import {AppleOneNewsType} from "types/appleNews";
import {Navbar} from "components/navbar";
import {OneNews} from "components/oneNews";
import {useAppDispatch} from "../store/store";
import {newsActions, useNewsSelector} from "../store/news";
import {SpaceBetween} from "components/styled/spaceBetween";
import {useMemo} from "react";
import styled from "styled-components";

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
      <AppleNewsList />
    </div>
  </div>
}

function searchInText(text: string, search: string) {
  return text.toLowerCase().includes(search.toLowerCase());
}

const AppleNewsList = () => {
  const news = useNewsSelector((state) => state.news);
  const isNewsMenu = useNewsSelector((state) => state.selectedMenu === 'news');
  const bookmarkIds = useNewsSelector((state) => state.bookmarkIds);
  const searchKeyword = useNewsSelector(state => state.search);
  const page = useNewsSelector((state) => state.page);
  const dispatch = useAppDispatch();

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
          <OneNews oneNews={news[0]} isMain={true} />
        </div>
      </div>
    )}
    <div css={`width: calc(100% - 496px)`}>
      {showNews.slice(offset, offset + pageLimit).map(e => (
        <div key={e.id} css={`width: ${33.33}%; display: inline-block`}>
          <OneNews oneNews={e} isMain={false} />
        </div>
      ))}

      <SpaceBetween css={`margin-right: 18px;`}>
        <div css={`color: #fff`}>
          <span>
            {showNews.length === 0 ? 0 : <>
              {page * pageLimit + 1}-{page * pageLimit + pageLimit}
            </>}
          </span>
          <span css={`opacity: 0.25`}> of {showNews.length}</span>
        </div>

        <div>
          {page > 0 && <Button onClick={() => dispatch(newsActions.previousPage())}>Previous</Button>}
          {page < (showNews.length /pageLimit - 1) && <Button onClick={() => dispatch(newsActions.nextPage())}>Next</Button>}
        </div>
      </SpaceBetween>
    </div>
  </SpaceBetween>
}

const Button = styled.div`
  position: static;
  left: 28.02%;
  right: 28.02%;
  top: 28%;
  bottom: 28%;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;
  text-transform: uppercase;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
  display: inline-block;
  padding: 7px 32px;
  letter-spacing: 0em;
  text-align: left;
  background: #3C3C3C;
  border-radius: 60px;
  margin-left: 10px;
  cursor: pointer;
`;