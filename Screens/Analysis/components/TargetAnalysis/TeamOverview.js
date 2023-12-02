import React from "react";
import { View, Image } from "react-native";
import { analysisStyle } from "../../constants/constants";
import TeamTableHeader from "../Tables/TeamTableHeader";
import TeamTableRow from "../Tables/TeamTableRow";
// 예시 데이터
import { leagueData } from "../../constants/data";
import RenderSquad from "./RenderSquad";

const RenderRank = () => (
  <View style={analysisStyle.container}>
    <Image
      source={require("../../../../constants/premier-league-logo.png")}
      style={{ width: 130, height: 26 }}
    />
    {/* 테이블 헤더 */}
    <TeamTableHeader
      headers={[
        { text: "순위", flex: 1 },
        { text: "팀명", flex: 4 },
        { text: "승", flex: 1 },
        { text: "무", flex: 1 },
        { text: "패", flex: 1 },
        { text: "승점", flex: 1 },
      ]}
    />
    {/* 테이블 로우 */}
    {leagueData.map((team, index) => (
      <TeamTableRow key={index} team={team} />
    ))}
  </View>
);

// 팀 개요 화면
const TeamOverview = () => {
  return (
    <View style={{ padding: 10 }}>
      {/* 리그 순위 */}
      <RenderRank />
      {/* 스쿼드 정보 */}
      <RenderSquad />
    </View>
  );
};

export default TeamOverview;
