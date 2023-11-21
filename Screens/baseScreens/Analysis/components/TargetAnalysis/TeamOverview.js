import React from "react";
import { View, Text, Image } from "react-native";
import {
  leagueData,
  squadData,
  listStyle,
  analysisStyle,
} from "../../constants/constants";
import TeamTableCell from "../Tables/TeamTableCell";
import TeamSection from "../Tables/TeamSection";
import TeamTableRow from "../Tables/TeamTableRow";

const RenderRank = () => (
  <View style={analysisStyle.container}>
    <Image
      source={require("../../../../../constants/premier-league-logo.png")}
      style={{ width: 130, height: 26 }}
    />
    {/* 테이블 헤더 */}
    <View
      style={{
        ...listStyle.table.header.container,
        borderBottomWidth: 0.7,
        marginBottom: 10,
      }}
    >
      <TeamTableCell flex={1} isHeader>
        순위
      </TeamTableCell>
      <TeamTableCell flex={4} isHeader>
        팀명
      </TeamTableCell>
      <TeamTableCell flex={1} isHeader>
        승
      </TeamTableCell>
      <TeamTableCell flex={1} isHeader>
        무
      </TeamTableCell>
      <TeamTableCell flex={1} isHeader>
        패
      </TeamTableCell>
      <TeamTableCell flex={1} isHeader>
        승점
      </TeamTableCell>
    </View>
    {/* 테이블 로우 */}
    {leagueData.map((team, index) => (
      <TeamTableRow key={index} team={team} />
    ))}
  </View>
);

const RenderSquad = () => (
  <View style={analysisStyle.container}>
    <Text style={analysisStyle.header}>스쿼드</Text>
    <TeamSection squad={squadData.attackers} title="Attackers" />
    <TeamSection squad={squadData.midfielders} title="Midfielders" />
    <TeamSection squad={squadData.defenders} title="Defenders" />
    <TeamSection squad={squadData.goalkeepers} title="Goalkeepers" />
  </View>
);

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
