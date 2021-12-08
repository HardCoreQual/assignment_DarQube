import {SpaceBetween} from "components/styled/spaceBetween";
import {Background, BackgroundContainer} from "components/styled/backgroundImage";
import {AppleOneNewsType} from "types/appleNews";
import {useAppDispatch, useAppSelector} from "../store/store";
import {newsActions} from "../store/news";
import Image from 'next/image';
import bookmark from '../images/bookmark.svg';
import emptyBookmark from '../images/emptyBookmark.svg';
import dayjs from 'dayjs';
import {truncText} from "../utils/truncText";

export const OneNews = ({oneNews, isMain}: {
  oneNews: AppleOneNewsType,
  isMain: boolean,
}) => {
  const openUrl = () => window.open(oneNews.url, '_blank');

  return <BackgroundContainer
    width={isMain ? 478 : 280}
    height={isMain ? 628 : 425}
  >
    <Background>
      <img src={oneNews.image} height="100%" width="100%" alt=""/>

      {/* NextImageNotWork: Not all images loaded, because all on different hosting, need download and save on own hosting */}
      {/*<Image src={imageUrl} layout="fill" alt={title} />*/}
    </Background>

    <div css={`padding: 32px 26px; height: 100%`}>
      <div css={`position: relative; height: calc(100% - 64px)`}>
        <div css={`
          color: #fff;
          border: 2px solid #fff;
          position: absolute;
          border-radius: 20px;
          padding: 5px 10px;
          font-size: 14px;
        `}>
          {oneNews.related}
        </div>

        {isMain && (
          <div css={`
            right: 0;
            position: absolute;
            color: #fff;
            background-color: #B73556;
            border-radius: 2px;
            padding: 3px 5px;
            font-size: 12px;
        `}>
            LATEST RESEARCH
          </div>
        )}

        <div css={`
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          height: 20px;
          width: 100%;
        `}>
          {isMain && (
            <>
            <span
              onClick={openUrl}
              css={`
              color: #fff;
              font-weight: bold;
              font-size: 14px;
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }`
            }>
              Read the Research
            </span>

              <div css={`
                 display: inline-block;
                 border-right: 1px solid #aaa;
                 height: 100%;
                 margin: 0 10px;
              `} />
            </>
          )}
          <span css={`color: #aaa;`}>
            {dayjs(new Date(oneNews.datetime * 1000)).format('D MMM YYYY')}
          </span>
        </div>

        <div
          onClick={openUrl}
          css={`
          position: absolute;
          bottom: 40px;
        `}>
          <div css={`
          color: #fff;
          font-weight: 500;
          font-size: ${isMain ? 24 : 20}px;
          line-height: ${isMain ? 32 : 28}px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }`}>
            {oneNews.headline}
          </div>
          <div css={`
            font-size: 12px;
            color: #aaa;
          `}>
            {truncText(oneNews.summary, 100)}
          </div>
        </div>

        <div css={`
          position: absolute;
          bottom: 0;
          right: 0;
        `}>
          <NewsBookmark id={oneNews.id} />
        </div>
      </div>

      <SpaceBetween>
        <div>

        </div>


      </SpaceBetween>
    </div>
  </BackgroundContainer>
}

const NewsBookmark = ({id}: {id: number}) => {
  const isActive = useAppSelector<boolean>((state) => {
    return state.news.bookmarkIds.includes(id);
  });
  const dispatch = useAppDispatch();

  return isActive
    ? <Image src={bookmark} width={13} height={13} alt="" onClick={(e) => dispatch(newsActions.removeBookmarkId(id))} />
    : <Image src={emptyBookmark} width={13} height={13} alt="" onClick={(e) => dispatch(newsActions.addBookmarkId(id))} />;
}
