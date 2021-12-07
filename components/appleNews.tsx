import {AppleOneNewsType} from "types/appleNews";
import {useState} from "react";
import Image from 'next/image';
import styled from "styled-components";

export type AppleNewsProps = {
  news: AppleOneNewsType[]
}

export const AppleNews = (props: AppleNewsProps) => {
  const [selected, setSelected] = useState<'news' | 'bookmarks'>('news');

  return <div>
    {selected === 'news' && <AppleNewsList {...props} />}
  </div>
}

const AppleNewsList = ({news}: AppleNewsProps) => {
  return <div>
    {news.slice(0, 1).map(e => (
      <OneNews height={500} width={400} title={e.headline} imageUrl={e.image} key={e.id} />
    ))}
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
      <Image src={imageUrl} width={width} height={height} alt={title} />
    </Background>
  </BackgroundContainer>
}

const BackgroundContainer = styled.div<{ height: number, width: number }>`
    display: inline-block;
    overflow: hidden;
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

const Background = styled.div`
  ${BackgroundContainer} > & {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`
