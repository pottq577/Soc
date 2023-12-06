import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import RenderSquad from "../../../../Analysis/components/TargetAnalysis/RenderSquad";
import { useGames } from "../../../hooks/useGames";

const MatchLineUp = ({ home, away, match_id }) => {
  const { selectedTabIndex, setSelectedTabIndex } = useGames();
  const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(
          `http://10.20.103.60:5002/match_player_stats/${match_id}`
        );
        const data = await response.json();
        const players = JSON.parse(data.data);
        const homeTeamId = 1625; // 예시로 Manchester City의 ID
        const awayTeamId = 1659; // 예시로 AFC Bournemouth의 ID

        const homePlayers = players.filter(
          (player) => player.team_id === homeTeamId
        );
        const awayPlayers = players.filter(
          (player) => player.team_id === awayTeamId
        );

        setHomeTeamPlayers(homePlayers);
        setAwayTeamPlayers(awayPlayers);
      } catch (error) {
        console.error("Error fetching player stats:", error);
      }
    };

    fetchPlayerStats();
  }, [match_id]);

  // TODO RenderSquad에서 실제 팀의 스쿼드 라인업을 출력할 것
  // 탭에 따른 컨텐츠 렌더링
  const renderTabContent = () => {
    const players = selectedTabIndex === 0 ? homeTeamPlayers : awayTeamPlayers;
    return <RenderSquad match_id={match_id} />;
  };

  return <ScrollView>{renderTabContent()}</ScrollView>;
};

export default MatchLineUp;
