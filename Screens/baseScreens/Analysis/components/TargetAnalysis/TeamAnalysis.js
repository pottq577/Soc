import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { analysisStyle } from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";

const matches = [
  { date: "2019/01/01", home: "맨시티", away: "아스날", score: "0 : 0" },
  { date: "2019/01/02", home: "맨시티", away: "아스날", score: "0 : 1" },
  { date: "2019/01/03", home: "맨시티", away: "아스날", score: "0 : 2" },
  { date: "2019/01/04", home: "맨시티", away: "아스날", score: "0 : 3" },
  { date: "2019/01/05", home: "맨시티", away: "아스날", score: "0 : 4" },
];

const MatchCard = ({ match, onPress }) => (
  <TouchableOpacity onPress={onPress} style={analysisStyle.matchList.container}>
    <Text style={analysisStyle.matchList.teamFont}>{match.home}</Text>
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "grey" }}>{match.date}</Text>
      <Text style={{ fontSize: 30 }}>{match.score}</Text>
    </View>
    <Text style={analysisStyle.matchList.teamFont}>{match.away}</Text>
  </TouchableOpacity>
);

const TeamAnalysis = ({ item }) => {
  const navigation = useNavigation();
  const handlePress = (match) => {
    navigation.navigate("MatchAnalysis", { match, item });
  };
  return (
    <View style={{ padding: 10 }}>
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
    </View>
  );
};

export default TeamAnalysis;
