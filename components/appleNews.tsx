import {AppleOneNewsType} from "types/appleNews";
import {useState} from "react";
import {MenuItemTextType, Navbar} from "components/navbar";
import {OneNews} from "components/oneNews";
import {Button} from "components/styled/paginationButton";

export type AppleNewsProps = {
  news: AppleOneNewsType[]
}

export const AppleNews = (props: AppleNewsProps) => {
  const [selected, setSelected] = useState<MenuItemTextType>('news');

  return <div css={`
    padding: 40px 13px 40px 31px;
    background-color: #242525;
    display: inline-block;
  `}>
    <Navbar selected={selected} setSelected={setSelected} />
    {selected === 'news' && <AppleNewsList {...props} />}
  </div>
}

const AppleNewsList = ({news}: AppleNewsProps) => {
  const [page, setPage] = useState(0);
  if (!news.length) {
    return null;
  }

  const rowLimit = 3;
  const countRows = 2;
  const pageLimit = countRows * rowLimit;

  const offset = 1 + page * pageLimit;

  return <div css={`
    display: flex;
    justify-content: flex-start;
  `}>
    <div>
      <OneNews height={628} width={478} title={news[0].headline} imageUrl={news[0].image} />
    </div>
    <div>
      {Array(countRows).fill(null).map((e, i) => (
        <div key={i}>
          {news.slice(offset + rowLimit * i, offset + rowLimit * i + rowLimit).map(e => (
            <OneNews height={425} width={280} title={e.headline} imageUrl={e.image} key={e.id} />
          ))}
        </div>
      ))}
      <div css={`
        display: flex;
        justify-content: space-between;
        margin-right: 18px;
      `}>
        <div></div>

        <div>
          {page > 0 && <Button onClick={() => setPage(page -1 )}>Previous</Button>}
          {page < (news.length /pageLimit - 1) && <Button onClick={() => setPage(page + 1 )}>Next</Button>}
        </div>
      </div>
    </div>
  </div>
}

