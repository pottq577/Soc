import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // useNavigation 훅 추가
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { POSTGRES_SERVER_ADDRESS } from "./constants/constants";

const AllTeam = ({ matchId, team1Name, team2Name }) => {
  const navigation = useNavigation();
  const [matchDetails, setMatchDetails] = useState({
    events: [],
    substitutions: [],
    match_info: {},
  });

  const [homeLineup, setHomeLineup] = useState([]);
  const [awayLineup, setAwayLineup] = useState([]);
  console.log(team2Name, team2Name);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          POSTGRES_SERVER_ADDRESS + `/match_events/${matchId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const combinedEvents = [
          ...data.goals,
          ...data.own_goals,
          ...data.red_cards,
          ...data.yellow_cards,
        ].sort((a, b) => a.time - b.time);
        setMatchDetails({
          ...data,
          events: combinedEvents,
          substitutions: data.substitutions,
        });

        if (data.match_info) {
          const { team1_name, team2_name } = data.match_info;

          const homeLineupResponse = await fetch(
            POSTGRES_SERVER_ADDRESS +
              `/matchAnalysisData/${matchId}/${team1Name}`
          );
          const awayLineupResponse = await fetch(
            POSTGRES_SERVER_ADDRESS +
              `/matchAnalysisData/${matchId}/${team2Name}`
          );

          if (!homeLineupResponse.ok || !awayLineupResponse.ok) {
            throw new Error("Failed to fetch lineups");
          }

          const homeLineupData = await homeLineupResponse.json();
          const awayLineupData = await awayLineupResponse.json();
          // homeLineupData를 콘솔에 로깅
          console.log("Home Lineup Data:", homeLineupResponse);
          console.log(homeLineupData.players_info);
          setHomeLineup(homeLineupData.players_info);
          setAwayLineup(awayLineupData.players_info);
        }
      } catch (error) {
        console.error("데이터 가져오기 중 문제 발생:", error.message);
      }
    };

    fetchData();
  }, [matchId, team1Name, team2Name]);

  // 라인업을 표시하는 함수
  const renderLineup = (lineup, title, matchId, teamName) => (
    <View style={styles.lineupContainer}>
      <Text style={styles.lineupTitle}>{title}</Text>
      {lineup.map((player) => (
        <TouchableOpacity
          key={player.wyid}
          onPress={() => handlePlayerPress(player, matchId, teamName)}
        >
          <Text style={styles.playerName}>
            {player.shortname} ({player.role_code2})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handlePlayerPress = (player, matchId, teamName) => {
    console.log("Selected Player:", player);
    console.log("Match ID:", matchId);
    console.log("teamName:", teamName);
    navigation.navigate("PlayerInformation", { player });
  };

  // 라벨에서 팀 이름 추출
  const labelParts = matchDetails.match_info.label
    ? matchDetails.match_info.label.split(" - ")
    : ["", ""];
  const homeTeam = labelParts[0].split(" vs ")[0];
  const awayTeam = labelParts[1] ? labelParts[1].split(",")[0] : "";

  const renderEvents = (team) => (
    <View style={styles.teamColumn}>
      <Text>경기 기록</Text>
      {matchDetails.events.map((event, index) => {
        if (event.team_name === team) {
          let eventStyle = styles.eventText; // 기본 스타일
          const eventType = event.tags[0]; // 이벤트 타입 (예: Goal, Yellow card, Red card)

          if (eventType === "Goal") {
            eventStyle = { ...styles.eventText, color: "blue" }; // 골은 초록색
          } else if (eventType === "Own goal") {
            eventStyle = { ...styles.eventText, color: "pink" }; // 옐로 카드는 노란색
          } else if (eventType === "Yellow card") {
            eventStyle = { ...styles.eventText, color: "yellow" }; // 옐로 카드는 노란색
          } else if (eventType === "Red card") {
            eventStyle = { ...styles.eventText, color: "red" }; // 레드 카드는 빨간색
          }

          return (
            <Text key={index} style={eventStyle}>
              {event.player_name} - {Math.floor(event.time / 60)}'
            </Text>
          );
        }
        return null;
      })}
    </View>
  );
  const renderSubstitutions = (team) => (
    <View style={styles.substitutionContainer}>
      <Text style={styles.sectionTitle}>{team} Substitutions</Text>
      {matchDetails.substitutions.map((substitution, index) => {
        if (substitution.team_name === team) {
          // 교체 이벤트 유형에 따른 스타일 결정
          const substitutionStyle =
            substitution.sub_event_type === "Player in"
              ? { ...styles.substitutionText, color: "blue" } // 'Player in'은 파란색
              : { ...styles.substitutionText, color: "red" }; // 'Player out'은 빨간색

          return (
            <Text key={index} style={substitutionStyle}>
              {substitution.sub_event_type === "Player in" ? "In: " : "Out: "}
              {substitution.player_name} ({Math.floor(substitution.time / 60)}')
            </Text>
          );
        }
        return null;
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>ID: {matchId}</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.teamTitle}>{team1Name}</Text>

          {renderEvents(homeTeam)}
          {renderLineup(homeLineup, "홈팀 라인업", matchId, team1Name)}
          {renderSubstitutions(homeTeam)}
        </View>
        <View style={styles.column}>
          <Text style={styles.teamTitle}>{team2Name}</Text>

          {renderEvents(awayTeam)}
          {renderLineup(awayLineup, "어웨이팀 라인업", matchId, team2Name)}
          {renderSubstitutions(awayTeam)}
        </View>
      </View>
    </View>
  );
};

const MatchAnalysis = ({ route }) => {
  const { matchId, team1Name, team2Name } = route.params; // team1Name와 team2Name 추가
  const [matchDetails, setMatchDetails] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "All", title: "전체" },
    { key: "Home", title: team1Name },
    { key: "Away", title: team2Name },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "All":
        return (
          <AllTeam
            matchDetails={matchDetails}
            matchId={matchId}
            team1Name={team1Name}
            team2Name={team2Name}
          />
        );
      case "Home":
        return (
          <HomeTeam
            matchDetails={matchDetails}
            matchId={matchId}
            team1Name={team1Name}
            team2Name={team2Name}
          />
        );
      case "Away":
        return (
          <AwayTeam
            matchDetails={matchDetails}
            matchId={matchId}
            team1Name={team1Name}
            team2Name={team2Name}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    fetch(home + `/match/${matchId}`)
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
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    padding: 10,
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
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
  matchDetailContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  time: {
    fontSize: 16,
    color: "#666",
  },
  stadium: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  event: {
    fontSize: 14,
    marginVertical: 4,
  },
  eventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teamColumn: {
    width: "50%", // 각 열은 화면의 반을 차지합니다.
  },
  // ... 추가 스타일 ...
});

export default MatchAnalysis;
