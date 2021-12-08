import {SpaceBetween} from "components/styled/spaceBetween";
import {AppleOneNewsType} from "types/appleNews";
import dayjs from 'dayjs';
import {truncText} from "../utils/truncText";
import styled from "styled-components";
import {NewsBookmark} from "components/newsBookmark";

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
        <Related>
          {oneNews.related}
        </Related>

        {isMain && (
          <LastResearch>
            LATEST RESEARCH
          </LastResearch>
        )}

        <LeftBottomContainer>
          {isMain && (
            <>
            <ReadTheResearch onClick={openUrl}>
              Read the Research
            </ReadTheResearch>

              <VerticalSeparator />
            </>
          )}
          <span css={`color: #aaa;`}>
            {dayjs(new Date(oneNews.datetime * 1000)).format('D MMM YYYY')}
          </span>
        </LeftBottomContainer>

        <div
          onClick={openUrl}
          css={`position: absolute; bottom: 40px;`}>
          <Title isMain={isMain}>
            {oneNews.headline}
          </Title>
          <div css={`font-size: 12px;color: #aaa;`}>
            {truncText(oneNews.summary, 100)}
          </div>
        </div>

        <div css={`position: absolute;bottom: 0;right: 0;`}>
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

const VerticalSeparator = styled.div`
   display: inline-block;
   border-right: 1px solid #aaa;
   height: 100%;
   margin: 0 10px;
`;

const Title = styled.div<{isMain: boolean}>`
  color: #fff;
  font-weight: 500;
  font-size: ${({isMain}) => isMain ? 24 : 20}px;
  line-height: ${({isMain}) => isMain ? 32 : 28}px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ReadTheResearch = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const LeftBottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 20px;
  width: 100%;
`;


const LastResearch = styled.div`
  right: 0;
  position: absolute;
  color: #fff;
  background-color: #B73556;
  border-radius: 2px;
  padding: 3px 5px;
  font-size: 12px;
`;

const Related = styled.div`
  color: #fff;
  border: 2px solid #fff;
  position: absolute;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 14px;
`;

export const BackgroundContainer = styled.div<{ height: number, width: number }>`
    display: inline-block;
    overflow: hidden;
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    z-index: 1;
    margin: 0 18px 18px 0;
    border-radius: 6px;
`;

export const Background = styled.div`
  ${BackgroundContainer} > & {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;

    background: linear-gradient(180deg, rgba(28, 58, 82, 0) 0%, #05141B 75.5%);
    opacity: 0.49;
  }
`;