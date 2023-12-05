import { useState, useEffect } from "react";

const useFetchGameData = (matchDetails, matchId, team) => {
  const [imageData, setImageData] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    if (matchDetails && matchId && team) {
      // 이미지 데이터 가져오기
      const fetchImageData = async () => {
        try {
          const response = await fetch(
            `http://10.20.102.165:5002/matchAnalysis/${matchId}/${team}`
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
            `http://10.20.102.165:5002/match_player_stats/${matchId}`
          );
          if (!response.ok) throw new Error("Failed to fetch player stats");
          const jsonResponse = await response.json();
          const data = JSON.parse(jsonResponse.data);
          const filteredData = data
            .filter((stat) => stat.team_name === team)
            .map(
              ({
                player_name,
                goals,
                assists,
                total_passes,
                pass_accuracy,
              }) => ({
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

      fetchImageData();
      fetchPlayerStats();
    }
  }, [matchDetails, matchId, team]);

  return { imageData, playerStats };
};

export default useFetchGameData;
