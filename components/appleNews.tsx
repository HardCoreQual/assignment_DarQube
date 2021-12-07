import {AppleOneNewsType} from "types/appleNews";
import {Navbar} from "components/navbar";
import {OneNews} from "components/oneNews";
import {Button} from "components/styled/paginationButton";
import {useAppDispatch} from "../store/store";
import {nextPage, previousPage, useNewsSelector} from "../store/news";
import {SpaceBetween} from "components/styled/spaceBetween";

export type AppleNewsProps = {
  news: AppleOneNewsType[]
}

export const AppleNews = (props: AppleNewsProps) => {
  return <div css={`
    padding: 40px 13px 40px 31px;
    background-color: #242525;
    display: inline-block;
  `}>
    <Navbar />
    <AppleNewsList {...props} />
  </div>
}

const AppleNewsList = ({news}:AppleNewsProps) => {
  const isNewsMenu = useNewsSelector((state) => state.selectedMenu === 'news');
  const bookmarkIds = useNewsSelector((state) => state.bookmarkIds);
  const page = useNewsSelector((state) => state.page);
  const dispatch = useAppDispatch();

  if (!news.length) {
    return null;
  }

  const showNews = isNewsMenu ? news.slice(1) : news.filter((e) => bookmarkIds.includes(e.id));

  const rowLimit = 3;
  const countRows = 2;
  const pageLimit = countRows * rowLimit;

  const offset = page * pageLimit;

  return <div css={`
    display: flex;
    justify-content: flex-start;
  `}>
    {isNewsMenu && (
      <div>
        <OneNews height={628} width={478}  oneNews={news[0]} />
      </div>
    )}
    <div>
      {Array(countRows).fill(null).map((e, i) => {
        const rowOffset = offset + rowLimit * i;

        return <div key={i}>
          {showNews.slice(rowOffset, rowOffset + rowLimit).map(e => (
            <OneNews height={425} width={280} oneNews={e} key={e.id} />
          ))}
        </div>
      })}
      <SpaceBetween css={`margin-right: 18px;`}>
        <div></div>

        <div>
          {page > 0 && <Button onClick={() => dispatch(previousPage())}>Previous</Button>}
          {page < (showNews.length /pageLimit - 1) && <Button onClick={() => dispatch(nextPage())}>Next</Button>}
        </div>
      </SpaceBetween>
    </div>
  </div>
}

