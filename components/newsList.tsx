import {AppleOneNewsType} from "types/appleNews";
import {useAppDispatch} from "../store/store";
import {OneNews} from "components/oneNews";
import {newsActions} from "../store/news";
import React, {useCallback} from "react";
import styled from "styled-components";

export const NewsList = ({showNews, offset, pageLimit, page}: {
  offset: number,
  pageLimit: number,
  page: number,
  showNews: AppleOneNewsType[]
}) => {
  return <div css={`width: calc(100% - 496px)`}>
    {showNews.slice(offset, offset + pageLimit).map(e => (
      <div key={e.id} css={`width: ${33.33}%; display: inline-block`}>
        <OneNews oneNews={e} isMain={false}/>
      </div>
    ))}

    <SpaceBetween css={`margin-right: 18px;`}>
      <div css={`color: #fff`}>
          <span>
            {showNews.length === 0 ? 0 : <>
              {page * pageLimit + 1}-{page * pageLimit + pageLimit}
            </>}
          </span>
        <span css={`opacity: 0.25`}> of {showNews.length}</span>
      </div>

      <MemoPagination showPrevious={page > 0} showNext={page < (showNews.length / pageLimit - 1)} />
    </SpaceBetween>
  </div>
}

const Pagination = ({showNext, showPrevious}: {showNext: boolean, showPrevious: boolean}) =>  {
  const dispatch = useAppDispatch();

  return <div>
    {showPrevious && <Button onClick={() => dispatch(newsActions.previousPage())}>Previous</Button>}
    {showNext && <Button onClick={() => dispatch(newsActions.nextPage())}>Next</Button>}
  </div>
}
const MemoPagination = React.memo(Pagination);

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`
const Button = styled.div`
  position: static;
  left: 28.02%;
  right: 28.02%;
  top: 28%;
  bottom: 28%;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;
  text-transform: uppercase;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
  display: inline-block;
  padding: 7px 32px;
  letter-spacing: 0em;
  text-align: left;
  background: #3C3C3C;
  border-radius: 60px;
  margin-left: 10px;
  cursor: pointer;
`;
