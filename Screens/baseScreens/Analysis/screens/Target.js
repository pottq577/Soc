import React from "react";
import { View, ScrollView } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { switchStyle } from "../constants/constants";
import { useAnalysis } from "../hooks/useAnalysis";
import Header from "../components/TargetAnalysis/Header";
import PlayerOverview from "../components/TargetAnalysis/PlayerOverview";
import PlayerAnalysis from "../components/TargetAnalysis/PlayerAnalysis";
import TeamOverview from "../components/TargetAnalysis/TeamOverview";
import TeamAnalysis from "../components/TargetAnalysis/TeamAnalysis";

const Target = ({ route }) => {
  const { item, isPlayer } = route.params;
  const { isOverviewSelected, setIsOverviewSelected } = useAnalysis(); // Custom Hook 사용

  const renderContentView = () => {
    if (!isPlayer) {
      return isOverviewSelected ? (
        <PlayerOverview isPlayer={isPlayer} />
      ) : (
        <PlayerAnalysis isPlayer={isPlayer} />
      );
    } else {
      return isOverviewSelected ? (
        <TeamOverview isPlayer={isPlayer} />
      ) : (
        <TeamAnalysis isPlayer={isPlayer} />
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
          values={["개요", "분석"]}
          selectedIndex={isOverviewSelected ? 0 : 1}
          onTabPress={(index) => setIsOverviewSelected(index === 0)}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
      </View>
      <View>{renderContentView()}</View>
    </ScrollView>
  );
};

export default Target;
