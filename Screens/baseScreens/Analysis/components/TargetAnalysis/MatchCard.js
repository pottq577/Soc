import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { analysisStyle } from "../../constants/constants";

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

export default MatchCard;
