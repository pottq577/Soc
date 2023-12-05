import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const initialLayout = { width: Dimensions.get("window").width };

const AllTeam = ({ matchDetails, matchId }) => {
  return (
    <View style={styles.teamContainer}>
      {matchDetails && (
        <>
          <Text>ID: {matchId}</Text>
          <Text style={styles.teamTitle}>홈 팀: {matchDetails.team1_name}</Text>
          <Text>팀 ID: {matchDetails.team1_id}</Text>
          {/* 홈 팀 추가 정보 */}

          <Text style={styles.teamTitle}>
            어웨이 팀: {matchDetails.team2_name}
          </Text>
          <Text>팀 ID: {matchDetails.team2_id}</Text>
          {/* 어웨이 팀 추가 정보 */}
        </>
      )}
    </View>
  );
};
const HomeTeam = ({ matchDetails, matchId }) => {
  const [imageData, setImageData] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    if (matchDetails) {
      // 이미지 데이터 가져오기
      fetch(
        `http://119.204.24.238:5000/matchAnalysis/${matchId}/${matchDetails.team1_name}`
      )
        .then((response) =>
          response.ok ? response.blob() : Promise.reject(response)
        )
        .then((blob) => URL.createObjectURL(blob))
        .then(setImageData)
        .catch((error) => console.error("Error fetching image:", error));

      // 선수 통계 데이터 가져오기
      fetch(`http://119.204.24.238:5000/match_player_stats/${matchId}`)
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((jsonResponse) => {
          const data = JSON.parse(jsonResponse.data);
          const filteredData = data
            .filter((stat) => stat.team_name === matchDetails.team1_name)
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
  }, [matchDetails, matchId]);

  const renderTableHeader = () => {
    return (
      <View style={styles.tableRowHeader}>
        <Text style={styles.tableHeaderCell}>Player</Text>
        <Text style={styles.tableHeaderCell}>Goals</Text>
        <Text style={styles.tableHeaderCell}>Assists</Text>
        <Text style={styles.tableHeaderCell}>Passes</Text>
        <Text style={styles.tableHeaderCell}>Accuracy</Text>
      </View>
    );
  };

  const renderTableRows = () => {
    return playerStats.map((stat, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.tableCell}>{stat.player_name}</Text>
        <Text style={styles.tableCell}>{stat.goals}</Text>
        <Text style={styles.tableCell}>{stat.assists}</Text>
        <Text style={styles.tableCell}>{stat.total_passes}</Text>
        <Text style={styles.tableCell}>
          {(stat.pass_accuracy * 100).toFixed(2)}%
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emphasizedText}>경기 패스네트워크</Text>
      {imageData && (
        <Image
          source={{ uri: imageData }}
          resizeMode="contain"
          style={styles.image}
        />
      )}

      <ScrollView style={styles.outputContainer}>
        {renderTableHeader()}
        {renderTableRows()}
      </ScrollView>
    </View>
  );
};

// styles 객체는 위의 예시에 있는 스타일을 그대로 사용합니다.

const AwayTeam = ({ matchDetails, matchId }) => {
  const [imageData, setImageData] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    if (matchDetails) {
      // 이미지 데이터 가져오기
      fetch(
        `http://119.204.24.238:5000/matchAnalysis/${matchId}/${matchDetails.team2_name}`
      )
        .then((response) =>
          response.ok ? response.blob() : Promise.reject(response)
        )
        .then((blob) => URL.createObjectURL(blob))
        .then(setImageData)
        .catch((error) => console.error("Error fetching image:", error));

      // 선수 통계 데이터 가져오기
      fetch(`http://119.204.24.238:5000/match_player_stats/${matchId}`)
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((jsonResponse) => {
          const data = JSON.parse(jsonResponse.data);
          const filteredData = data
            .filter((stat) => stat.team_name === matchDetails.team2_name)
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
  }, [matchDetails, matchId]);

  const renderTableHeader = () => {
    return (
      <View style={styles.tableRowHeader}>
        <Text style={styles.tableHeaderCell}>Player</Text>
        <Text style={styles.tableHeaderCell}>Goals</Text>
        <Text style={styles.tableHeaderCell}>Assists</Text>
        <Text style={styles.tableHeaderCell}>Passes</Text>
        <Text style={styles.tableHeaderCell}>Accuracy</Text>
      </View>
    );
  };

  const renderTableRows = () => {
    return playerStats.map((stat, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.tableCell}>{stat.player_name}</Text>
        <Text style={styles.tableCell}>{stat.goals}</Text>
        <Text style={styles.tableCell}>{stat.assists}</Text>
        <Text style={styles.tableCell}>{stat.total_passes}</Text>
        <Text style={styles.tableCell}>
          {(stat.pass_accuracy * 100).toFixed(2)}%
        </Text>
      </View>
    ));
  };
  return (
    <View style={styles.teamContainer}>
      <Text style={styles.emphasizedText}>경기 패스네트워크</Text>
      {imageData && (
        <Image
          source={{ uri: imageData }}
          resizeMode="contain"
          style={styles.image}
        />
      )}
      <ScrollView style={styles.outputContainer}>
        {renderTableHeader()}
        {renderTableRows()}
      </ScrollView>
    </View>
  );
};

const MatchAnalysis = ({ route }) => {
  const { matchId } = route.params;
  const [matchDetails, setMatchDetails] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "All", title: "전체" },
    { key: "Home", title: "홈" },
    { key: "Away", title: "어웨이" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "All":
        return <AllTeam matchDetails={matchDetails} matchId={matchId} />;
      case "Home":
        return <HomeTeam matchDetails={matchDetails} matchId={matchId} />;
      case "Away":
        return <AwayTeam matchDetails={matchDetails} matchId={matchId} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetch(`http://119.204.24.238:5000/match/${matchId}`)
      .then((response) => response.json())
      .then((data) => setMatchDetails(data))
      .catch((error) => console.error("Error fetching match details: ", error));
  }, [matchId]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "white" }}
          style={{ backgroundColor: "#003366" }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teamContainer: {
    flex: 1, // 컨테이너를 전체 화면으로 확장합니다.
    alignItems: "stretch",
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    backgroundColor: "#003366",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  matchDetails: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    marginBottom: 10,
    width: "100%", // 이미지의 너비를 화면 너비에 맞춥니다.
    height: 300, // 이미지의 높이를 조절합니다.
    alignSelf: "stretch",
  },
  emphasizedText: {
    fontSize: 20, // 텍스트 크기 증가
    fontWeight: "bold", // 텍스트 굵게
    color: "blue", // 텍스트 색상 변경
    textAlign: "center", // 텍스트 중앙 정렬
    marginTop: 10, // 상단 여백 추가
    marginBottom: 10, // 하단 여백 추가
  },
  outputContainer: {
    width: "100%", // 출력 컨테이너의 너비
  },
  tableRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0", // 헤더 배경색
    padding: 10, // 헤더 내부 여백
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD", // 행 아래의 테두리 색상
    padding: 10, // 행 내부 여백
  },
  tableHeaderCell: {
    fontWeight: "bold",
    flex: 1, // 셀의 공간을 균등하게 배분
    textAlign: "center", // 텍스트 가운데 정렬
  },
  tableCell: {
    flex: 1, // 셀의 공간을 균등하게 배분
    textAlign: "center", // 텍스트 가운데 정렬
  },
  // ... 추가 스타일 ...
});

export default MatchAnalysis;
