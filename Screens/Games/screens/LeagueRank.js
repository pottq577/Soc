import React from "react";
import { View, ScrollView, Text } from "react-native";
import { rankingStyle } from "../constants/constants";
import useFetchLeagueRank from "../hooks/fetchLeagueRank";

const LeagueRank = () => {
  const teams = useFetchLeagueRank();

  return (
    <ScrollView style={{ marginBottom: 140 }}>
      <View style={rankingStyle.headerRow}>
        <Text style={rankingStyle.headerCell}>순위</Text>
        <Text style={rankingStyle.headerCellTeamName}>팀명</Text>
        <Text style={rankingStyle.headerCell}>승</Text>
        <Text style={rankingStyle.headerCell}>무</Text>
        <Text style={rankingStyle.headerCell}>패</Text>
        <Text style={rankingStyle.headerCell}>득실차</Text>
        <Text style={rankingStyle.headerCell}>승점</Text>
      </View>
      {teams.map((team, index) => (
        <View key={index} style={rankingStyle.row}>
          <Text style={rankingStyle.cell}>{team.rank}</Text>
          <Text style={rankingStyle.cellTeamName}>{team.team}</Text>
          <Text style={rankingStyle.cell}>{team.wins}</Text>
          <Text style={rankingStyle.cell}>{team.draws}</Text>
          <Text style={rankingStyle.cell}>{team.losses}</Text>
          <Text style={rankingStyle.cell}>{team.goal_difference}</Text>
          <Text style={rankingStyle.cell}>{team.points}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default LeagueRank;
