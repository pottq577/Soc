import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import NoContentView from "../components/NoContentView";
import CardView from "../components/CardView";
import { SEASONS, CATEGORIES, TEAMS } from "../constants/constants";
// 예시 데이터
import { playersData, teamData } from "../constants/data";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/config";
/**
 * '분석' 탭 진입 시 보여줄 카드 렌더링
 * @param selectedSeason: 사용자가 선택한 시즌에 따라 출력되는 정보를 다르게 함
 * @param isPlayerSelected: 해당 파라미터의 상태에 따라 선수 / 팀 카드를 보여줌
 * @param category: isPlayerSelected 상태에 따라 선수 / 팀 카테고리를 선택함
 * @param data: isPlayerSelected 상태에 따라 선수 / 팀 데이터를 선택함
 * @returns CardView.js
 */
const CardContent = ({ selectedSeason, isPlayerSelected }) => {
  if (selectedSeason !== SEASONS[6]) return <NoContentView />;
  const categories = isPlayerSelected ? CATEGORIES.PLAYER : CATEGORIES.TEAMS;

  const [topWins, setTopWins] = useState([]);
  const [topLosses, setTopLosses] = useState([]);
  const [topGoalDifference, setTopGoalDifference] = useState([]);
  const [topGoalsFor, setTopGoalsFor] = useState([]);
  const [topGoalsAgainst, setTopGoalsAgainst] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [topAssisters, setTopAssisters] = useState([]);
  const [topPassers, setTopPassers] = useState([]);
  const [topPlayed, setTopPlayed] = useState([]);
  const [topYellowCards, setTopYellowCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeamData = async (category, setState) => {
    try {
      const response = await fetch(
        `${POSTGRES_SERVER_ADDRESS}/top-teams/${category}`
      );
      const data = await response.json();
      const sortedData = Object.entries(data)
        .map(([team, value]) => ({ team, value }))
        .sort((a, b) => b.value - a.value); // 내림차순으로 정렬
      setState(sortedData);
    } catch (error) {
      Alert.alert("Error", `Failed to load data for ${category}`);
    }
  };

  const fetchPlayerData = async (category, setState) => {
    try {
      const response = await fetch(
        `${POSTGRES_SERVER_ADDRESS}/top-${category}`
      );
      const data = await response.json();
      // const sortedData = Object.entries(data)
      //   .map(([team, value]) => ({ team, value }))
      //   .sort((a, b) => b.value - a.value); // 내림차순으로 정렬
      // setState(sortedData);
      setState(data);
      // console.log(data);
    } catch (error) {
      Alert.alert("Error", `Failed to load data for ${category}`);
    }
  };

  useEffect(() => {
    fetchTeamData("wins", setTopWins);
    fetchTeamData("losses", setTopLosses);
    fetchTeamData("goal-difference", setTopGoalDifference);
    fetchTeamData("goals-for", setTopGoalsFor);
    fetchTeamData("goals-against", setTopGoalsAgainst);
    fetchPlayerData("scorers", setTopScorers);
    fetchPlayerData("assisters", setTopAssisters);
    fetchPlayerData("passers", setTopPassers);
    fetchPlayerData("played", setTopPlayed);
    fetchPlayerData("yellow-cards", setTopYellowCards);
    setIsLoading(false);
  }, []);

  const renderContent = () => {
    // console.log("Top Scorers: ", topScorers);
    // 선수일 때
    if (isPlayerSelected) {
      return (
        <View>
          <CardView
            category={"득점왕"}
            data={topScorers}
            isPlayer={isPlayerSelected}
          />
          <CardView
            category={"어시스트왕"}
            data={topAssisters}
            isPlayer={isPlayerSelected}
          />
          <CardView
            category={"패스마스터"}
            data={topPassers}
            isPlayer={isPlayerSelected}
          />
          <CardView
            category={"열심히 하시잖아"}
            data={topPlayed}
            isPlayer={isPlayerSelected}
          />
          <CardView
            category={"치즈왕"}
            data={topYellowCards}
            isPlayer={isPlayerSelected}
          />
        </View>
      );
    } else {
      // console.log("Top Wins: ", topWins);
      // 팀일 때
      const teamNameMapping = {
        아스날: "Arsenal",
        본머스: "AFCBournemouth",
        첼시: "Chelsea",
        "토트넘 홋스퍼": "TottenhamHotspur",
        "허더즈 필드": "HuddersfieldTown",
        "레스터 시티": "LeicesterCity",
        리버풀: "Liverpool",
        "맨체스터 시티": "ManchesterCity",
        "맨체스터 유나이티드": "ManchesterUnited",
        "스토크 시티": "StokeCity",
        "스완지 시티": "SwanseaCity",
        왓포드: "Watford",
        "웨스트 브롬위치 알비온": "WestBromwichAlbion",
        "웨스트햄 유나이티드": "WestHamUnited",
      };
      const mapTeamData = (teamData) => {
        return teamData.map((team) => ({
          rank: team.value.rank,
          name: team.value.team,
          score:
            team.value.losses ||
            team.value.wins ||
            team.value.goal_difference ||
            team.value.goals_for ||
            team.value.goals_against,
          image: TEAMS[teamNameMapping[team.value.team]], // 매핑된 팀 이름을 키로 사용
        }));
      };
      return (
        <View>
          <CardView
            category="승리"
            data={mapTeamData(topWins)}
            isPlayer={false}
          />
          <CardView
            category="패배"
            data={mapTeamData(topLosses)}
            isPlayer={false}
          />
          <CardView
            category="득실차"
            data={mapTeamData(topGoalDifference)}
            isPlayer={false}
          />
          <CardView
            category="득점"
            data={mapTeamData(topGoalsFor)}
            isPlayer={false}
          />
          <CardView
            category="실점"
            data={mapTeamData(topGoalsAgainst)}
            isPlayer={false}
          />
        </View>
      );
    }
  };

  return renderContent();
};

export default CardContent;
