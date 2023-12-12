import { useState, useEffect } from "react";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/config";

const useFetchGameData = (matchDetails, match_id, team) => {
  const [imageData, setImageData] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);
  const [playerName, setPlayerName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (matchDetails && match_id && team) {
      setIsLoading(true);

      const fetchData = async () => {
        await fetchImageData();
        await fetchPlayerStats();
        await fetchPlayerName();
        setIsLoading(false);
      };

      fetchData();
    }
  }, [matchDetails, match_id, team]);
  // 이미지 데이터 가져오기
  const fetchImageData = async () => {
    try {
      const response = await fetch(
        `${POSTGRES_SERVER_ADDRESS}/matchAnalysis/${match_id}/${team}`
      );
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageData(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  // 선수 통계 데이터 가져오기
  const fetchPlayerStats = async () => {
    try {
      const response = await fetch(
        `${POSTGRES_SERVER_ADDRESS}/match_player_stats/${match_id}`
      );
      if (!response.ok) throw new Error("Failed to fetch player stats");
      const jsonResponse = await response.json();
      const data = JSON.parse(jsonResponse.data);
      const filteredData = data
        .filter((stat) => stat.team_name === team)
        .map(
          ({ player_name, goals, assists, total_passes, pass_accuracy }) => ({
            player_name,
            goals,
            assists,
            total_passes,
            pass_accuracy,
          })
        );
      setPlayerStats(filteredData);
    } catch (error) {
      console.error("Error fetching player stats:", error);
    }
  };
  // 선수명만 가져옴
  const fetchPlayerName = async () => {
    try {
      const response = await fetch(
        `${POSTGRES_SERVER_ADDRESS}/match_player_stats/${match_id}`
      );
      if (!response.ok) throw new Error("Failed to fetch player stats");
      const jsonResponse = await response.json();
      const data = JSON.parse(jsonResponse.data);
      const filteredData = data
        .filter((stat) => stat.team_name === team)
        .map(({ player_name }) => ({
          player_name,
        }));
      setPlayerName(filteredData);
    } catch (error) {
      console.error("Error fetching player name:", error);
    }
  };
  return { imageData, playerStats, playerName, isLoading };
};

export default useFetchGameData;
