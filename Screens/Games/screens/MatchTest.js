import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const MatchTest = () => {
  //   const navigation = useNavigation();
  const [matches, setMatches] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);

  useEffect(() => {
    fetch("http://10.20.102.165:5002/matches") // Flask 서버 URL로 변경
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
        const uniqueMonths = new Set(
          data.map((match) => match.datetime.slice(0, 7))
        ); // 'YYYY-MM' 형식으로 월 추출
        setMonths([...uniqueMonths].sort());
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // 월별 필터링 버튼 렌더링
  const renderMonthButtons = () => {
    return months.map((month) => (
      <Text
        key={month}
        onPress={() => setSelectedMonth(month)}
        style={styles.monthButton}
      >
        {month}
      </Text>
    ));
  };

  // 선택된 월에 따라 경기 목록 필터링 및 렌더링
  const renderMatchesForSelectedMonth = () => {
    return matches
      .filter((match) => match.datetime.startsWith(selectedMonth))
      .map((match, index) => (
        // <TouchableOpacity
        //   onPress={() =>
        //     navigation.navigate("MatchAnalysis", { matchId: match.match_id })
        //   }
        // >
        <View key={index} style={styles.matchRow}>
          {/* 경기 정보 렌더링 */}
          <Text style={styles.matchDayCell}>
            {match.gameweek}주차: {match.team1_name} vs {match.team2_name}
          </Text>
          <Text style={styles.matchDayCell}>날짜: {match.datetime}</Text>
          <Text style={styles.matchDayCell}>장소: {match.venue}</Text>
          <Text style={styles.matchDayCell}>
            결과: {match.team1_goals} - {match.team2_goals}
          </Text>
          <Text style={styles.matchDayCell}>경기시간: {match.duration}</Text>
        </View>
        // </TouchableOpacity>
      ));
  };

  return (
    <ScrollView>
      <View style={styles.monthButtonContainer}>{renderMonthButtons()}</View>
      {renderMatchesForSelectedMonth()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f7f7f7", // 제목 배경색
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  headerCell: {
    width: "10%",
    fontWeight: "bold", // 제목 글씨 굵게
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    width: "10%",
    textAlign: "center",
  },
  matchDayCell: {
    marginVertical: 3,
    fontSize: 14,
    color: "#333",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  scene: {
    flex: 1,
  },

  monthButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  monthButton: {
    fontSize: 8.5,
    padding: 10,
    backgroundColor: "#ddd",
    margin: 5,
  },
  matchRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
});
export default MatchTest;
