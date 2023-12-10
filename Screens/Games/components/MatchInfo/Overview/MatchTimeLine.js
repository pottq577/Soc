import React from "react";
import { View, Text } from "react-native";
import { overviewStyle } from "../../../constants/constants";

const MatchTimeLine = ({ event, team1Name, team2Name }) => {
  let eventIcon;
  if (event.event_type === "Shot") {
    eventIcon = "⚽️"; // 골
  } else if (event.tags.includes("Yellow card")) {
    eventIcon = "🟨"; // 옐로카드
  } else if (event.tags.includes("Red card")) {
    eventIcon = "🟥"; // 레드카드
  }

  // 이벤트 시간을 분 단위로 변환
  const eventTime = Math.floor(event.time / 60);

  // 팀 이름을 사용하여 홈/어웨이 팀 판별
  const isHomeTeamEvent = event.team_name === team1Name;

  return (
    <View style={overviewStyle.timeline.eventRow}>
      {/* 홈 팀 선수명 (좌측에 배치) */}
      <Text style={[overviewStyle.timeline.event, { textAlign: "center" }]}>
        {isHomeTeamEvent ? event.player_name : ""}
      </Text>

      {/* 홈 팀 이모티콘 */}
      <Text style={overviewStyle.timeline.event}>
        {isHomeTeamEvent ? eventIcon : ""}
      </Text>

      {/* 이벤트 시간 (중앙에 배치) */}
      <Text style={overviewStyle.timeline.time}>{eventTime}'</Text>

      {/* 어웨이 팀 이모티콘 */}
      <Text style={overviewStyle.timeline.event}>
        {!isHomeTeamEvent ? eventIcon : ""}
      </Text>

      {/* 어웨이 팀 선수명 (우측에 배치) */}
      <Text style={[overviewStyle.timeline.event, { textAlign: "center" }]}>
        {!isHomeTeamEvent ? event.player_name : ""}
      </Text>
    </View>
  );
};

export default MatchTimeLine;
