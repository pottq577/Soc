import React from "react";
import { View, Text } from "react-native";
import { overviewStyle } from "../../constants/constants";

const TimelineEvent = ({ event }) => {
  const eventIcon =
    event.type === "goal" ? "⚽️" : event.type === "yellow-card" ? "🟨" : "🟥";

  return (
    <View style={overviewStyle.timeline.eventRow}>
      {/* 홈 팀 이벤트 */}
      <Text style={overviewStyle.timeline.event}>
        {event.team === "home" ? `${event.player} ${eventIcon}` : ""}
      </Text>

      {/* 이벤트 시간 */}
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={overviewStyle.timeline.time}>{event.time}'</Text>
      </View>

      {/* 어웨이 팀 이벤트 */}
      <Text style={overviewStyle.timeline.event}>
        {event.team === "away" ? `${eventIcon} ${event.player}` : ""}
      </Text>
    </View>
  );
};

export default TimelineEvent;
