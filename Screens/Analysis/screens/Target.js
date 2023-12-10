import React from "react";
import { View, ScrollView } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { switchStyle } from "../constants/constants";
import { useAnalysis } from "../hooks/useAnalysis";
import Header from "../components/TargetAnalysis/Header";
import MatchList from "../components/TargetAnalysis/MatchList";
import PlayerOverview from "../components/TargetAnalysis/PlayerOverview";
import TeamOverview from "../components/TargetAnalysis/TeamOverview";

/**
 * 사용자가 선택한 선수 / 팀에 대한 상세 분석 화면
 * @returns
 */
const Target = ({ route }) => {
  const { item, isPlayer } = route.params;
  // console.log("Target isPlayer : ", isPlayer);

  const {
    isOverviewSelected,
    setIsOverviewSelected,
    isWholeSeason,
    setIsWholeSeason,
  } = useAnalysis(); // Custom Hook 사용

  const renderContentView = () => {
    if (isPlayer) {
      return isOverviewSelected ? (
        <PlayerOverview item={item} isPlayer={isPlayer} />
      ) : (
        <MatchList
          item={item}
          isPlayer={isPlayer}
          isWholeSeason={isWholeSeason}
          setIsWholeSeason={setIsWholeSeason}
        />
      );
    } else {
      return isOverviewSelected ? (
        <TeamOverview item={item} isPlayer={!isPlayer} />
      ) : (
        <MatchList
          item={item}
          isPlayer={isPlayer}
          isWholeSeason={isWholeSeason}
          setIsWholeSeason={setIsWholeSeason}
        />
      );
    }
  };

  return (
    <ScrollView>
      {/* 선수 정보 헤더 */}
      <Header item={item} isPlayer={isPlayer} />
      {/* 개요 / 분석 선택 탭 */}
      <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["경기", "시즌"]}
          selectedIndex={isOverviewSelected ? 0 : 1}
          onTabPress={(index) => setIsOverviewSelected(index === 0)}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
      </View>
      {renderContentView()}
    </ScrollView>
  );
};

export default Target;
