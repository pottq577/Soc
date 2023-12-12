import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import MatchHeader from "../components/MatchInfo/MatchHeader";
import Separator from "../../../components/Separator";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { switchStyle } from "../constants/constants";
import MatchAnalysis from "../components/MatchInfo/Analysis/MatchAnalysis";
import MatchOverview from "../components/MatchInfo/Overview/MatchOverview";
import { useGames } from "../hooks/useGames";
import fetchMatchDetails from "../hooks/fetchMatchDetails";
import { POSTGRES_SERVER_ADDRESS } from "../constants/constants";

// TODO MatchOverview.js에 각종 데이터 전달하거나 MatchOverview.js에서 직접 데이터 가져오기
const MatchInfo = ({ route }) => {
  const {
    datetime,
    match_id,
    team1_goals,
    team1_name,
    team2_goals,
    team2_name,
    homeLogo,
    awayLogo,
  } = route.params;
  const { selectedTabIndex, setSelectedTabIndex } = useGames();
  const { matchDetails } = fetchMatchDetails(match_id);
  // console.log("Get Match Info - match_id : ", match_id);
  const [matchEvents, setMatchEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${POSTGRES_SERVER_ADDRESS}/match_events/${match_id}`
        );
        const data = await response.json();

        const combinedEvents = [
          ...data.goals,
          ...data.yellow_cards.filter((event) =>
            event.tags.includes("Yellow card")
          ),
          ...data.red_cards.filter((event) => event.tags.includes("Red card")),
        ].sort((a, b) => a.time - b.time);

        setMatchEvents(combinedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [match_id]);

  // 렌더링할 컨텐츠를 결정하는 함수
  const renderContentView = () => {
    if (matchDetails) {
      switch (selectedTabIndex) {
        case 0: // '개요' 탭 선택 시
          // console.log(
          //   "MatchInfo matchDetails.team1_name : ",
          //   matchDetails.team1_name
          // );
          return (
            <MatchOverview
              match_id={match_id}
              matchDetails={matchDetails}
              selectedTabIndex={selectedTabIndex}
              {...{
                team1_name,
                team1_goals,
                team2_name,
                team2_goals,
                datetime,
                homeLogo,
                awayLogo,
              }}
              matchEvents={matchEvents}
            />
          );
        case 1: // '패스 네트워크' 탭 선택 시
          return (
            <MatchAnalysis match_id={match_id} matchDetails={matchDetails} />
          );
        default:
          return null;
      }
    } else {
      console.log("MatchInfo - matchDetails loading ...");
    }
  };

  return (
    <ScrollView>
      <MatchHeader
        {...{
          team1_name,
          team1_goals,
          team2_name,
          team2_goals,
          datetime,
          homeLogo,
          awayLogo,
          matchEvents,
        }}
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
