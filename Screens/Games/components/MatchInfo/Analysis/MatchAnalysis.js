import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useGames } from "../../../hooks/useGames";
import { analysisStyle, switchStyle } from "../../../constants/constants";
import AnalysisTeam from "./AnalysisTeam";

const MatchAnalysis = ({ matchDetails, match_id }) => {
  const { selectedTabIndex, setSelectedTabIndex } = useGames();
  // console.log("Get Match Id : ", match_id);

  const ControlTab = () => (
    <View style={{ height: 60, width: "100%" }}>
      <SegmentedControlTab
        values={["홈", "어웨이"]}
        selectedIndex={selectedTabIndex}
        onTabPress={setSelectedTabIndex}
        tabsContainerStyle={switchStyle.tabsContainer}
        tabStyle={switchStyle.tabs}
        activeTabStyle={switchStyle.activeTab}
        tabTextStyle={switchStyle.tabText}
        activeTabTextStyle={switchStyle.activeTabText}
      />
    </View>
  );

  const PassNetwork = ({ team }) => (
    <View style={{ padding: 10 }}>
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>패스 네트워크</Text>
        <ControlTab />
        <AnalysisTeam
          matchDetails={matchDetails}
          match_id={match_id}
          team={team}
        />
      </View>
    </View>
  );

  const GoalPath = () => {
    return (
      <View style={{ padding: 10 }}>
        <View style={analysisStyle.container}>
          <Text style={analysisStyle.header}>골 경로</Text>
          <ControlTab />
        </View>
      </View>
    );
  };

  // 렌더링할 컨텐츠를 결정하는 함수
  const renderContentView = () => {
    if (!matchDetails) {
      return <Text>Loading...</Text>;
    }

    switch (selectedTabIndex) {
      case 0:
        return <PassNetwork team={matchDetails.team1_name} />;
      case 1:
        return <PassNetwork team={matchDetails.team2_name} />;
      default:
        return null;
    }
  };

  // return <ScrollView>{renderContentView()}</ScrollView>;
  return (
    <View>
      {renderContentView()}
      <GoalPath />
    </View>
  );
};

export default MatchAnalysis;
