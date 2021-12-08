import {AppleOneNewsType} from "types/appleNews";
import {Navbar} from "components/navbar";
import {OneNews} from "components/oneNews";
import {Button} from "components/styled/paginationButton";
import {useAppDispatch} from "../store/store";
import {newsActions, useNewsSelector} from "../store/news";
import {SpaceBetween} from "components/styled/spaceBetween";
import {useMemo} from "react";

export type AppleNewsProps = {
  news: AppleOneNewsType[]
}

export const AppleNews = (props: AppleNewsProps) => {
  return <div css={`
    padding: 40px 13px 40px 31px;
    background-color: #242525;
    display: inline-block;
    width: 1439px;
    height: 1000px;
  `}>
    <div css={`height: calc(100% - 80px)`}>
      <Navbar />
      <AppleNewsList {...props} />
    </div>
  </div>
}

function searchInText(text: string, search: string) {
  return text.toLowerCase().includes(search.toLowerCase());
}

const AppleNewsList = ({news}:AppleNewsProps) => {
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

  if (!news.length) {
    return null;
  }
  return <SpaceBetween>
    {isNewsMenu && (
      <div>
        <div css={`height: 100%`}>
          <OneNews height={628} width={478} oneNews={news[0]} />
        </div>
      </div>
    )}
    <div css={`width: calc(100% - 496px)`}>
      {showNews.slice(offset, offset + pageLimit).map(e => (
        <div key={e.id} css={`width: ${33.33}%; display: inline-block`}>
          <OneNews height={425} width={280} oneNews={e} />
        </div>
      ))}

      <SpaceBetween css={`margin-right: 18px;`}>
        <div css={`color: #fff`}>
          <span>
            {page * pageLimit + 1}-{Math.min(page * pageLimit + pageLimit, showNews.length)}
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

