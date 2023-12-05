import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import MatchHeader from "../components/MatchInfo/MatchHeader";
import Separator from "../../../components/Separator";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { switchStyle } from "../constants/constants";
import MatchAnalysis from "../components/MatchInfo/Analysis/MatchAnalysis";
import MatchOverview from "../components/MatchInfo/Overview/MatchOverview";
import { useGames } from "../hooks/useGames";

// TODO MatchOverview.js에 각종 데이터 전달하거나 MatchOverview.js에서 직접 데이터 가져오기
const MatchInfo = ({ route }) => {
  const {
    datetime,
    match_id,
    team1_goals,
    team1_name,
    team2_goals,
    team2_name,
  } = route.params;
  const { selectedTabIndex, setSelectedTabIndex } = useGames();
  const [matchDetails, setMatchDetails] = useState(null);
  // console.log("Get Match Info - match_id : ", match_id);

  useEffect(() => {
    fetch(`http://10.20.102.165:5002/match/${match_id}`)
      .then((response) => response.json())
      .then((data) => setMatchDetails(data))
      .catch((error) => console.error("Error fetching match details: ", error));
  }, [match_id]);

  // 렌더링할 컨텐츠를 결정하는 함수
  const renderContentView = () => {
    switch (selectedTabIndex) {
      case 0: // '개요' 탭 선택 시
        return <MatchOverview />;
      case 1: // '패스 네트워크' 탭 선택 시
        return (
          <MatchAnalysis match_id={match_id} matchDetails={matchDetails} />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <MatchHeader
        team1_name={team1_name}
        team1_goals={team1_goals}
        team2_name={team2_name}
        team2_goals={team2_goals}
        datetime={datetime}
      />
      <Separator />
      <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["개요", "패스 네트워크"]}
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

export default MatchInfo;
