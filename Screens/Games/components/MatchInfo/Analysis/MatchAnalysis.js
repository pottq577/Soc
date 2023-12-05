import React from "react";
import { View, ScrollView } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useGames } from "../../../hooks/useGames";
import { switchStyle } from "../../../constants/constants";
import AnalysisTeam from "./AnalysisTeam";

const MatchAnalysis = ({ matchDetails, match_id }) => {
  const { selectedTabIndex, setSelectedTabIndex } = useGames();
  // console.log("Get Match Id : ", match_id);

  // 렌더링할 컨텐츠를 결정하는 함수
  const renderContentView = () => {
    if (!matchDetails) {
      return <Text>Loading...</Text>; // 또는 다른 로딩 표시
    }

    switch (selectedTabIndex) {
      case 0:
        return (
          <AnalysisTeam
            matchDetails={matchDetails}
            match_id={match_id}
            team={matchDetails.team1_name}
          />
        );
      case 1:
        return (
          <AnalysisTeam
            matchDetails={matchDetails}
            match_id={match_id}
            team={matchDetails.team2_name}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView>
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
      {renderContentView()}
    </ScrollView>
  );
};

export default MatchAnalysis;
