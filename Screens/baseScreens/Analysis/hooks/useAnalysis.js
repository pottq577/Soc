import { useReducer } from "react";
import ActionTypes from "../constants/ActionTypes";

const initialState = {
  isPlayerSelected: true,
  menuVisible: false,
  selectedSeason: "2019/20",
  isOverviewSelected: true,
};

function analysisReducer(state, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU:
      return { ...state, menuVisible: !state.menuVisible };
    case ActionTypes.SET_PLAYER_SELECTED:
      return { ...state, isPlayerSelected: action.payload };
    case ActionTypes.SET_SELECTED_SEASON:
      return { ...state, selectedSeason: action.payload, menuVisible: false };
    case ActionTypes.SET_OVERVIEW:
      return { ...state, isOverviewSelected: action.payload };
    default:
      return state;
  }
}

export const useAnalysis = () => {
  const [state, dispatch] = useReducer(analysisReducer, initialState);
  // action을 생성하여 dispatch하는 헬퍼 함수
  const toggleMenu = () => {
    dispatch({ type: ActionTypes.TOGGLE_MENU });
  };
  const setIsPlayerSelected = (isSelected) => {
    dispatch({ type: ActionTypes.SET_PLAYER_SELECTED, payload: isSelected });
  };
  const setSelectedSeason = (season) => {
    dispatch({ type: ActionTypes.SET_SELECTED_SEASON, payload: season });
  };
  const setIsOverviewSelected = (isOverview) => {
    dispatch({ type: ActionTypes.SET_OVERVIEW, payload: isOverview });
  };

  return {
    state,
    toggleMenu,
    setIsPlayerSelected,
    setSelectedSeason,
    setIsOverviewSelected,
  };
};
