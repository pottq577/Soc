import React from "react";
import { Text, View } from "react-native";
import { analysisStyle } from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";
import RadarChart from "./RadarChart";
import MatchCard from "./MatchCard";

const matches = [
  { date: "2019/01/01", home: "맨시티", away: "아스날", score: "0 : 0" },
  { date: "2019/01/02", home: "맨시티", away: "아스날", score: "0 : 1" },
  { date: "2019/01/03", home: "맨시티", away: "아스날", score: "0 : 2" },
  { date: "2019/01/04", home: "맨시티", away: "아스날", score: "0 : 3" },
  { date: "2019/01/05", home: "맨시티", away: "아스날", score: "0 : 4" },
];

const PlayerAnalysis = ({ item }) => {
  const navigation = useNavigation();
  const handlePress = (match) => {
    navigation.navigate("MatchAnalysis", { match, item });
  };
  return (
    <View style={{ padding: 10 }}>
      {/* 경기 선택 */}
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>경기 선택</Text>
        {matches.map((match, index) => (
          <MatchCard
            key={index}
            match={match}
            onPress={() => handlePress(match)}
          />
        ))}
      </View>
      {/* 레이더 차트 */}
      <RadarChart />
    </View>
  );
};

export default PlayerAnalysis;
