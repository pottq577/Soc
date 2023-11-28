import React from "react";
import { View, Text } from "react-native";
import { analysisStyle } from "../../constants/constants";

/**
 * 리그 순위 뷰
 * !! TODO LIST:
 * !! 전체 리그 순위는 3개 팀에 대해서만 순위를 보여줌
 * !! 3개의 팀 중 사용자가 선택한 팀을 가운데에 표시
 * !! ex) 1등: 바르셀로나, ..., 4등: 아스날, ...
 * !!     사용자가 아스날 선택 시 순위 표시 예시: 3등 4등(아스날) 5등
 * !! 사용자가 선택한 팀 row에 대해서 강조 스타일 적용 고려
 */
const TeamInfoRow = ({ rank, teamName, wins, draws, losses, points }) => {
  return (
    <View style={analysisStyle.team.row}>
      <Text style={analysisStyle.team.cell}>{rank}</Text>
      <Text style={analysisStyle.team.cell}>{teamName}</Text>
      <Text style={analysisStyle.team.cell}>{wins}</Text>
      <Text style={analysisStyle.team.cell}>{draws}</Text>
      <Text style={analysisStyle.team.cell}>{losses}</Text>
      <Text style={analysisStyle.team.cell}>{points}</Text>
    </View>
  );
};

export default TeamInfoRow;
