import { ScrollView, View } from "react-native";
import React, { useReducer } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { styles, switchStyle } from "../../../Styles/analysisStyles";
import SeasonPickerView from "./SeasonPickerView";
import CardContent from "./CardContent";
import Separator from "../../Separator";
import ActionTypes from "./ActionTypes";

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

const seasons = ["2023/24", "2022/23", "2021/22", "2020/21", "2019/20"];

const AnalysisScreen = () => {
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
  const { selectedSeason, isPlayerSelected, menuVisible } = state;

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        {/* 선수 / 팀 선택 */}
        <SegmentedControlTab
          values={["선수", "팀"]}
          selectedIndex={isPlayerSelected ? 0 : 1}
          onTabPress={(index) => setIsPlayerSelected(index === 0)}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
        {/* 시즌 선택 뷰 */}
        <SeasonPickerView
          selectedSeason={selectedSeason}
          seasons={seasons}
          menuVisible={menuVisible}
          toggleMenu={toggleMenu}
          setSelectedSeason={setSelectedSeason}
        />
      </View>
      <Separator />
      {/* 카드 뷰 */}
      <CardContent
        selectedSeason={selectedSeason}
        isPlayerSelected={isPlayerSelected}
      />
    </ScrollView>
  );
};

export default AnalysisScreen;
