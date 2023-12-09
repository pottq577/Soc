import React from "react";
import { Text, View } from "react-native";
import { analysisStyle } from "../../../constants/constants";
import { timelineEvents } from "../../../constants/data";
import MatchTimeLine from "./MatchTimeLine";
import MatchDetails from "./MatchDetails";
import MatchLineUp from "./MatchLineUp";
import Test from "./test";

const MatchOverview = ({ match_id, matchDetails, selectedTabIndex }) => {
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
        {timelineEvents.map((event, index) => (
          <MatchTimeLine key={index} event={event} />
        ))}
      </View>
      {/* 경기 세부 정보 카드 */}
      <MatchDetails matchDetails={matchDetails} />
      {/* 경기 라인 업 카드 */}
      <MatchLineUp match_id={match_id} />
      {renderContentView()}
    </View>
  );
};

export default MatchOverview;
