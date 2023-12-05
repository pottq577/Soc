import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { matchAnalysisStyle } from "../../../constants/constants";

const AnalysisTeam = ({ matchDetails, match_id, team }) => {
  const [imageData, setImageData] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);

  // console.log(
  //   "Get Image Data URL: ",
  //   `http://10.20.102.165:5002/matchAnalysis/${match_id}/${team}`
  // );
  useEffect(() => {
    if (matchDetails && match_id && team) {
      // 이미지 데이터 가져오기
      fetch(`http://10.20.102.165:5002/matchAnalysis/${match_id}/${team}`)
        .then((response) =>
          response.ok ? response.blob() : Promise.reject(response)
        )
        .then((blob) => URL.createObjectURL(blob))
        .then(setImageData)
        .catch((error) => console.error("Error fetching image:", error));

      // 선수 통계 데이터 가져오기
      fetch(`http://10.20.102.165:5002/match_player_stats/${match_id}`)
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((jsonResponse) => {
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
        })
        .catch((error) => console.error("Error fetching player stats:", error));
    }
  }, [matchDetails, match_id, team]);

  // 테이블 헤더 및 로우 렌더링 함수
  const renderTableHeader = () => (
    <View style={matchAnalysisStyle.tableRowHeader}>
      <Text style={matchAnalysisStyle.tableHeaderCell}>선수명</Text>
      <Text style={matchAnalysisStyle.tableHeaderCell}>골</Text>
      <Text style={matchAnalysisStyle.tableHeaderCell}>어시스트</Text>
      <Text style={matchAnalysisStyle.tableHeaderCell}>패스 수</Text>
      <Text style={matchAnalysisStyle.tableHeaderCell}>패스 정확도</Text>
    </View>
  );

  const renderTableRows = () => {
    return playerStats.map((stat, index) => (
      <View key={index} style={matchAnalysisStyle.tableRow}>
        <Text style={matchAnalysisStyle.tableCell}>{stat.player_name}</Text>
        <Text style={matchAnalysisStyle.tableCell}>{stat.goals}</Text>
        <Text style={matchAnalysisStyle.tableCell}>{stat.assists}</Text>
        <Text style={matchAnalysisStyle.tableCell}>{stat.total_passes}</Text>
        <Text style={matchAnalysisStyle.tableCell}>
          {(stat.pass_accuracy * 100).toFixed(0)}%
        </Text>
      </View>
    ));
  };

  return (
    <View>
      {imageData && (
        <Image
          source={{ uri: imageData }}
          resizeMode="contain"
          style={matchAnalysisStyle.passNetwork}
        />
      )}
      <ScrollView style={{ marginBottom: 50 }}>
        {renderTableHeader()}
        {renderTableRows()}
      </ScrollView>
    </View>
  );
};

export default AnalysisTeam;
