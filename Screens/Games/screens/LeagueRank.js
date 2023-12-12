import React from "react";
import { View, ScrollView, Text, Image, ActivityIndicator } from "react-native";
import { rankingStyle } from "../constants/constants";
import useFetchLeagueRank from "../hooks/fetchLeagueRank";
import { TEAMS } from "../../Analysis/constants/constants";
import Space from "../../../components/Space";

const teamNameMapping = {
  "맨체스터 시티": "ManchesterCity",
  "맨체스터 유나이티드": "ManchesterUnited",
  "토트넘 홋스퍼": "TottenhamHotspur",
  리버풀: "Liverpool",
  첼시: "Chelsea",
  아스날: "Arsenal",
  번리: "Burnley",
  에버튼: "Everton",
  "레스터 시티": "LeicesterCity",
  "뉴캐슬 유나이티드": "NewcastleUnited",
  "크리스탈 팰리스": "CrystalPalace",
  본머스: "AFCBournemouth",
  "웨스트햄 유나이티드": "WestHamUnited",
  왓포드: "Watford",
  "브라이튼 앤 호브 알비온": "Brighton&HoveAlbion",
  "허더즈 필드": "HuddersfieldTown",
  사우스햄튼: "Southampton",
  "스완지 시티": "SwanseaCity",
  "스토크 시티": "StokeCity",
  "웨스트 브롬위치 알비온": "WestBromwichAlbion",
};

const LeagueRank = () => {
  const { teams, isLoading } = useFetchLeagueRank();
  // console.log(teams);

  const mapTeamLogo = (teamName) => {
    const englishTeamName = teamNameMapping[teamName];
    return TEAMS[englishTeamName];
  };

  return (
    <View>
      {isLoading ? (
        <View style={{ padding: 100 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView style={{ marginBottom: 300 }}>
          <View style={rankingStyle.headerRow}>
            <Text style={rankingStyle.headerCell}>순위</Text>
            <Text style={rankingStyle.headerCellTeamName}>팀명</Text>
            <Text style={rankingStyle.headerCell}></Text>
            <Text style={rankingStyle.headerCell}>승</Text>
            <Text style={rankingStyle.headerCell}>무</Text>
            <Text style={rankingStyle.headerCell}>패</Text>
            <Text style={rankingStyle.headerCell}>득실차</Text>
            <Text style={rankingStyle.headerCell}>승점</Text>
          </View>
          {teams.map((team, index) => (
            <View key={index} style={rankingStyle.row}>
              <Text style={rankingStyle.cell}>{team.rank}</Text>
              <Image
                source={mapTeamLogo(team.team)}
                style={rankingStyle.logo}
              />
              <Space paddingHorizontal={3} />
              <Text style={rankingStyle.cellTeamName}>{team.team}</Text>
              <Text style={rankingStyle.cell}>{team.wins}</Text>
              <Text style={rankingStyle.cell}>{team.draws}</Text>
              <Text style={rankingStyle.cell}>{team.losses}</Text>
              <Text style={rankingStyle.cell}>{team.goal_difference}</Text>
              <Text style={rankingStyle.cell}>{team.points}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default LeagueRank;
