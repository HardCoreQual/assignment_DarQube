import {SpaceBetween} from "components/styled/spaceBetween";
import {Background, BackgroundContainer} from "components/styled/backgroundImage";
import {AppleOneNewsType} from "types/appleNews";
import {EmptyBookmark} from "../images/emptyBookmark";

export const OneNews = ({height, width, oneNews}: {
  height: number,
  width: number,
  oneNews: AppleOneNewsType,
}) => {
  return <BackgroundContainer width={width} height={height}>
    <Background>
      <img src={oneNews.image} height="100%" width="100%" alt=""/>

      {/* NextImageNotWork: Not all images loaded, because all on different hosting, need download and save on own hosting */}
      {/*<Image src={imageUrl} layout="fill" alt={title} />*/}
    </Background>

    <SpaceBetween css={`
      flex-direction: column;
      padding: 32px 26px;
      height: calc( 100% - 66px);
    `}>
      <SpaceBetween/>

      <SpaceBetween>
        <div>

        </div>

        <NewsBookmark id={oneNews.id} />
      </SpaceBetween>
    </SpaceBetween>
  </BackgroundContainer>
}

const NewsBookmark = ({id}: {id: number}) => {
  return <EmptyBookmark />
}
