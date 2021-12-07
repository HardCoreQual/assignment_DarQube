import Image from "next/image";
import EmptyBookmarkImg from "../images/Vector.png";
import {SpaceBetween} from "components/styled/spaceBetween";
import {Background, BackgroundContainer} from "components/styled/backgroundImage";

export const OneNews = ({height, imageUrl, width, title}: {
  height: number,
  width: number,
  imageUrl: string,
  title: string,
}) => {
  return <BackgroundContainer width={width} height={height}>
    <Background>
      <img src={imageUrl} height="100%" width="100%" alt=""/>

      {/* NextImageNotWork: Not all images loaded, because all on different hosting, need download and save on own hosting */}
      {/*<Image src={imageUrl} layout="fill" alt={title} />*/}
    </Background>

    <SpaceBetween css={`
      flex-direction: column;
      margin: 32px 26px;
      height: 100%;
    `}>
      <SpaceBetween/>

      <SpaceBetween>
        <div>

        </div>

        <Image src={EmptyBookmarkImg} width={10} height={10}/>
      </SpaceBetween>
    </SpaceBetween>
  </BackgroundContainer>
}

