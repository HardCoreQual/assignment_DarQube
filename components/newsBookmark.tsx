import {useAppDispatch, useAppSelector} from "../store/store";
import Image from "next/image";
import bookmark from "../images/bookmark.svg";
import {newsActions} from "../store/news";
import emptyBookmark from "../images/emptyBookmark.svg";

export const NewsBookmark = ({id}: { id: number }) => {
  const isActive = useAppSelector<boolean>((state) => {
    return state.news.bookmarkIds.includes(id);
  });
  const dispatch = useAppDispatch();

  return isActive
    ? <Image src={bookmark} width={13} height={13} alt="" onClick={(e) => dispatch(newsActions.removeBookmarkId(id))}/>
    : <Image src={emptyBookmark} width={13} height={13} alt="" onClick={(e) => dispatch(newsActions.addBookmarkId(id))}/>;
}