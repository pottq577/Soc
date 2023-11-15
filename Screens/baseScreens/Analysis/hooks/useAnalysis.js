import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants/constants";

export const useAnalysis = () => {
  const [isPlayerSelected, setIsPlayerSelected] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("2019/20");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOverviewSelected, setIsOverviewSelected] = useState(true);

  // isPlayerSelected 상태가 변경될 때마다 실행됩니다.
  useEffect(() => {
    // '선수'를 선택한 경우
    if (isPlayerSelected) {
      setSelectedCategory(CATEGORIES.PLAYER[0]);
    }
    // '팀'을 선택한 경우
    else {
      setSelectedCategory(CATEGORIES.TEAMS[0]);
    }
  }, [isPlayerSelected]); // isPlayerSelected 상태가 변경될 때만 이 useEffect를 실행합니다.

  // 메뉴의 표시 상태를 토글하는 함수
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // 상태와 액션을 설정하는 함수들을 반환합니다.
  return {
    isPlayerSelected,
    setIsPlayerSelected,
    menuVisible,
    toggleMenu,
    selectedSeason,
    setSelectedSeason,
    selectedCategory,
    setSelectedCategory,
    isOverviewSelected,
    setIsOverviewSelected,
  };
};
