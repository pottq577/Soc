import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { analysisStyle } from "../../../constants/constants";
import { timelineEvents } from "../../../constants/data";
import MatchTimeLine from "./MatchTimeLine";
import MatchDetails from "./MatchDetails";
import MatchLineUp from "./MatchLineUp";
import Test from "./test";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/constants";

const MatchOverview = ({ match_id, matchDetails, selectedTabIndex }) => {
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

  const renderContentView = () => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <Test
            match_id={match_id}
            matchDetails={matchDetails}
            team={matchDetails.team1_name}
          />
        );
      case 1:
        return (
          <Test
            match_id={match_id}
            matchDetails={matchDetails}
            team={matchDetails.team2_name}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ padding: 10 }}>
      {/* 타임라인 카드 */}
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>타임라인</Text>
        {matchEvents.map((event, index) => (
          <MatchTimeLine
            key={index}
            event={event}
            team1Name={matchDetails.team1_name}
            team2Name={matchDetails.team2_name}
          />
        ))}
      </View>
      {/* 경기 세부 정보 카드 */}
      {/* <MatchDetails matchDetails={matchDetails} /> */}
      {/* 경기 라인 업 카드 */}
      <MatchLineUp match_id={match_id} />
      {renderContentView()}
    </View>
  );
};

export default MatchOverview;
