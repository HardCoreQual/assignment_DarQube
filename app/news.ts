import {createSlice} from "@reduxjs/toolkit";
import {AppleOneNewsType} from "types/appleNews";

type State = {
  news: AppleOneNewsType[],
  page: number,
  bookmarkIds: number[],
};

const initialState: State = {
  news: [],
  page: 0,
  bookmarkIds: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    nextPage: (state) => {
      return {
        ...state,
        page: state.page + 1,
      }
    },
    previousPage: (state) =>  {
      return {
        ...state,
        page: state.page - 1,
      }
    },
  },
});

export const newsSliceReducer = newsSlice.reducer;
export const { previousPage, nextPage } = newsSlice.actions;
