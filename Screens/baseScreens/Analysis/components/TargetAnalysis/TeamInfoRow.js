import React from "react";
import { View, Text } from "react-native";
import { analysisStyle } from "../../constants/constants";

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
