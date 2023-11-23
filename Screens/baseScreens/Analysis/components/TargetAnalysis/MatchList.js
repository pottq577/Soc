import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { analysisStyle, matches } from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "../../hooks/useAnalysis";
import RadarChart from "./RadarChart";
import MatchCard from "./MatchCard";
import MatchMonthTabs from "./MatchMonthTabs";
import groupMatchesByMonth from "./utils/groupMatches";

// 선수(팀)이 참여했던 경기 리스트 출력
const MatchList = ({ item, isPlayer }) => {
  const { selectedMonth, setSelectedMonth } = useAnalysis();
  const groupedMatches = groupMatchesByMonth(matches);
  const navigation = useNavigation();

  // groupedMatches에 selectedMonth가 있는지 확인하고, 없으면 첫 번째 월로 설정
  useEffect(() => {
    if (!groupedMatches[selectedMonth]) {
      setSelectedMonth(Object.keys(groupedMatches)[0]);
    }
  }, [selectedMonth, groupedMatches, setSelectedMonth]);

  const handlePress = (match) => {
    navigation.navigate("MatchAnalysis", { match, item, isPlayer });
  };

  return (
    <View style={{ padding: 10 }}>
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>경기 선택</Text>
        {/* 월 선택 탭 */}
        <MatchMonthTabs
          months={Object.keys(groupedMatches)}
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
        />
        {/* 경기 선택 */}
        {groupedMatches[selectedMonth] &&
          groupedMatches[selectedMonth].map((match, index) => (
            <MatchCard
              key={index}
              match={match}
              onPress={() => handlePress(match)}
            />
          ))}
      </View>
      {/* 선수 분석일 때만 레이더 차트 표시 */}
      {!isPlayer && <RadarChart />}
    </View>
  );
};

export default MatchList;
