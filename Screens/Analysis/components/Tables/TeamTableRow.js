import React from "react";
import { TouchableOpacity } from "react-native";
import TeamTableCell from "./TeamTableCell";
import { listStyle } from "../../constants/constants";

// 리그 순위에 대한 리스트
const TeamTableRow = ({ team }) => {
  return (
    <TouchableOpacity style={listStyle.table.row.container}>
      <TeamTableCell flex={1}>{team.rank}</TeamTableCell>
      <TeamTableCell flex={4}>{team.teamName}</TeamTableCell>
      <TeamTableCell flex={1}>{team.wins}</TeamTableCell>
      <TeamTableCell flex={1}>{team.draws}</TeamTableCell>
      <TeamTableCell flex={1}>{team.losses}</TeamTableCell>
      <TeamTableCell flex={1}>{team.points}</TeamTableCell>
    </TouchableOpacity>
  );
};

export default TeamTableRow;
