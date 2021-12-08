import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppleOneNewsType} from "types/appleNews";
import {MenuItemTextType} from "components/navbar";
import {RootState, useAppSelector} from "./store";

type State = {
  news: AppleOneNewsType[],
  page: number,
  bookmarkIds: number[],
  selectedMenu: MenuItemTextType,
  search: string;
};

const initialState: State = {
  news: [],
  page: 0,
  bookmarkIds: [],
  selectedMenu: 'news',
  search: '',
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
    },
    changeSelectMenu: (state, payload: PayloadAction<MenuItemTextType>) => {
      state.selectedMenu = payload.payload;
      state.page = 0;
    },
    changeSearch: (state, {payload}: PayloadAction<string>) => {
      state.search = payload;
      state.page = 0;
    },
    setNews: (state, {payload}: PayloadAction<AppleOneNewsType[]>) => {
      state.news = payload;
    }
  },
});

export const newsSliceReducer = newsSlice.reducer;
export const newsActions = newsSlice.actions;

export const useNewsSelector = <T>(
  selector: (state: RootState['news']) => T,
  equalityFn?: (left: T, right: T) => boolean
) => useAppSelector((state) => selector(state.news), equalityFn);
