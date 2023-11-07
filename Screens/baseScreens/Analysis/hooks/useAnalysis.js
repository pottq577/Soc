import { useReducer } from "react";
import ActionTypes from "../constants/ActionTypes";

const initialState = {
  isPlayerSelected: true,
  menuVisible: false,
  selectedSeason: "2019/20",
};

function analysisReducer(state, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU:
      return { ...state, menuVisible: !state.menuVisible };
    case ActionTypes.SET_PLAYER_SELECTED:
      return { ...state, isPlayerSelected: action.payload };
    case ActionTypes.SET_SELECTED_SEASON:
      return { ...state, selectedSeason: action.payload, menuVisible: false };
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
  return { state, toggleMenu, setIsPlayerSelected, setSelectedSeason };
};
