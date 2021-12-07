import {AppleOneNewsType} from "types/appleNews";
import {useState} from "react";
import styled from "styled-components";
import {MenuItem, Navbar} from "components/navbar";

export type AppleNewsProps = {
  news: AppleOneNewsType[]
}

export const AppleNews = (props: AppleNewsProps) => {
  const [selected, setSelected] = useState<MenuItem>('news');

  return <div css={`
    padding: 0 13px 0 31px;
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
    </div>
  </div>
}

const OneNews = ({height, imageUrl, width, title}: {
  height: number,
  width: number,
  imageUrl: string,
  title: string,
}) => {
  return <BackgroundContainer width={width} height={height}>
    <Background>
      <img src={imageUrl} height="100%" width="100%" alt="" />

      {/* NextImageNotWork: Not all images loaded, because all on different hosting, need download and save on own hosting */}
      {/*<Image src={imageUrl} layout="fill" alt={title} />*/}
    </Background>
  </BackgroundContainer>
}

const BackgroundContainer = styled.div<{ height: number, width: number }>`
    display: inline-block;
    overflow: hidden;
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    z-index: 1;
    margin: 0 18px 18px 0;
`;

const Background = styled.div`
  ${BackgroundContainer} > & {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;

    background: linear-gradient(180deg, rgba(28, 58, 82, 0) 0%, #05141B 75.5%);
    opacity: 0.49;
    border-radius: 6px;
  }
`
