import React from "react";
import { View, Text, Image } from "react-native";
import {
  leagueData,
  squadData,
  analysisStyle,
} from "../../constants/constants";
import TeamTableHeader from "../Tables/TeamTableHeader";
import TeamSection from "../Tables/TeamSection";
import TeamTableRow from "../Tables/TeamTableRow";

const RenderRank = () => (
  <View style={analysisStyle.container}>
    <Image
      source={require("../../../../../constants/premier-league-logo.png")}
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

const RenderSquad = () => (
  <View style={analysisStyle.container}>
    <Text style={analysisStyle.header}>스쿼드</Text>
    {/* title 값은 TeamSection.js에서 활용하고, title 수정 시 constants.js의 positionMapping 변수 매핑 가능 */}
    <TeamSection squad={squadData.attackers} title="공격수" />
    <TeamSection squad={squadData.midfielders} title="미드필더" />
    <TeamSection squad={squadData.defenders} title="수비수" />
    <TeamSection squad={squadData.goalkeepers} title="골키퍼" />
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
