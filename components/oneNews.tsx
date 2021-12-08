import {SpaceBetween} from "components/styled/spaceBetween";
import {Background, BackgroundContainer} from "components/styled/backgroundImage";
import {AppleOneNewsType} from "types/appleNews";
import {useAppDispatch, useAppSelector} from "../store/store";
import {newsActions} from "../store/news";
import Image from 'next/image';
import bookmark from '../images/bookmark.svg';
import emptyBookmark from '../images/emptyBookmark.svg';

export const OneNews = ({oneNews, isMain}: {
  oneNews: AppleOneNewsType,
  isMain: boolean,
}) => {

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
        <div
          onClick={() => window.open(oneNews.url, '_blank')}
          css={`
          position: absolute;
          bottom: 40px;
          color: #fff;
          font-size: ${isMain ? 24 : 20}px;
          line-height: ${isMain ? 32 : 28}px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        `}>
          {oneNews.headline}
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
