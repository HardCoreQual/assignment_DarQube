import {AppleOneNewsType} from "types/appleNews";

export type AppleNewsProps = {
  news: AppleOneNewsType[]
}

export const AppleNews = ({ news }: AppleNewsProps) => {
  return <div>
    {JSON.stringify(news[23])}
  </div>
}