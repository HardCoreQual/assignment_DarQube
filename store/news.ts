import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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
      state.page++;
    },
    previousPage: (state) =>  {
      state.page--;
    },
    addBookmarkId: (state, payload: PayloadAction<number>) => {
      state.bookmarkIds.push(payload.payload);
    },
    removeBookmarkId: (state,  payload: PayloadAction<number>) => {
      state.bookmarkIds = state.bookmarkIds.filter(id => id !== payload.payload);
    }
  },
});

export const newsSliceReducer = newsSlice.reducer;
export const { previousPage, nextPage, ...newsActions } = newsSlice.actions;
