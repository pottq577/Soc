import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SCREEN_WIDTH, analysisStyle } from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "../../hooks/useAnalysis";
import MatchCard from "./MatchCard";
import MatchMonthTabs from "./MatchMonthTabs";
import groupMatchesByMonth from "./utils/groupMatches";
// example data
import { matches } from "../../constants/data";

// 한 경기에 대해서만 분석
const TargetMatch = ({ isWholeSeason, navigation, item, isPlayer }) => {
  const { selectedMonth, setSelectedMonth } = useAnalysis();
  const groupedMatches = groupMatchesByMonth(matches);
  // groupedMatches에 selectedMonth가 있는지 확인하고, 없으면 첫 번째 월로 설정
  useEffect(() => {
    if (!groupedMatches[selectedMonth]) {
      setSelectedMonth(Object.keys(groupedMatches)[0]);
    }
  }, [selectedMonth, groupedMatches, setSelectedMonth]);

  const handlePress = (match) => {
    navigation.navigate("MatchAnalysis", {
      match,
      item,
      isPlayer,
      isWholeSeason: false,
    });
  };

  return (
    <View>
      {/* 월 선택 탭 */}
      <MatchMonthTabs
        months={Object.keys(groupedMatches)}
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
      />
      {/* 경기 선택 */}
      {groupedMatches[selectedMonth].map((match, index) => (
        <MatchCard
          key={index}
          match={match}
          onPress={() => handlePress(match)}
        />
      ))}
    </View>
  );
};

const TargetSeason = ({ isWholeSeason, isPlayer, navigation }) => {
  const handlePress = () => {
    navigation.navigate("MatchAnalysis", {
      isPlayer,
      isWholeSeason: true,
    });
  };

  console.log("TargetSeason isPlayer : ", isPlayer);
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        borderWidth: 1,
        height: 50,
        borderRadius: 15,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#rgba(71, 39, 245, 0.5)",
        width: SCREEN_WIDTH / 4,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
        분석하기
      </Text>
    </TouchableOpacity>
  );
};

// 선수(팀)이 참여했던 경기 리스트 출력
const MatchList = ({ item, isPlayer, isWholeSeason, setIsWholeSeason }) => {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 10 }}>
      {/* 한 경기에 대해서만 분석 */}
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>경기 선택</Text>
        <TargetMatch
          navigation={navigation}
          isWholeSeason={isWholeSeason}
          item={item}
          isPlayer={isPlayer}
        />
      </View>
      {/* 시즌에 대한 분석 */}
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>시즌 분석</Text>
        <TargetSeason
          navigation={navigation}
          isWholeSeason={isWholeSeason}
          item={item}
          isPlayer={isPlayer}
        />
      </View>
    </View>
  );
};

export default MatchList;
