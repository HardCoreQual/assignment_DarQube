import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {newsSliceReducer} from "./news";
import {useDispatch, useSelector} from "react-redux";

const reducer = combineReducers({
  news: newsSliceReducer
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector = <T>(
  selector: (state: RootState) => T,
  equalityFn?: (left: T, right: T) => boolean
) => useSelector<RootState, T>(selector, equalityFn);

export default store;