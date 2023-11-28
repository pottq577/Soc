import { useReducer } from "react";
import { ActionTypes } from "../constants/ActionTypes";

const initialState = {
  news: [],
  selectedUrl: null,
  isLoading: true,
  isRefreshing: false,
  imageHeights: {},
};

function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_NEWS:
      return {
        ...state,
        news: action.news,
        isLoading: false,
        isRefreshing: false,
      };
    case ActionTypes.SET_SELECTED_URL:
      return { ...state, selectedUrl: action.url };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.loading };
    case ActionTypes.SET_REFRESHING:
      return { ...state, isRefreshing: action.refreshing };
    case ActionTypes.SET_IMAGE_HEIGHT:
      return {
        ...state,
        imageHeights: {
          ...state.imageHeights,
          [action.imageUrl]: action.height,
        },
      };
    default:
      return state;
  }
}

export function useNewsReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
}
