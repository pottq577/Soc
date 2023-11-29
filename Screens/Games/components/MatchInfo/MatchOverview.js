import React from "react";
import { Text, View } from "react-native";
import { overviewStyle, analysisStyle } from "../../constants/constants";
import { timelineEvents } from "../../constants/data";
import TimelineEvent from "./TimelineEvent";

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
    </View>
  );
};

export default MatchOverview;
