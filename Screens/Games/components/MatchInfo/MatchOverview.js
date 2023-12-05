import React from "react";
import { Text, View } from "react-native";
import { analysisStyle } from "../../constants/constants";
import { timelineEvents, matchDetails } from "../../constants/data";
import TimelineEvent from "./TimelineEvent";
import MatchDetails from "./MatchDetails";
import MatchLineUp from "./MatchLineUp";

const MatchOverview = () => {
  return (
    <View style={{ padding: 10 }}>
      {/* 타임라인 카드 */}
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>타임라인</Text>
        {timelineEvents.map((event, index) => (
          <TimelineEvent key={index} event={event} />
        ))}
      </View>
      {/* 경기 세부 정보 카드 */}
      <MatchDetails matchDetails={matchDetails} />
      {/* 경기 라인 업 카드 */}
      <MatchLineUp />
    </View>
  );
};

export default MatchOverview;
