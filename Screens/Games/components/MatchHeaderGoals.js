import React from "react";
import { View, Text } from "react-native";
import { matchListStyles } from "../constants/constants";
import Space from "../../../components/Space";

const MatchHeaderGoals = () => {
  return (
    <View style={{ flexDirection: "row", padding: 20 }}>
      <View style={matchListStyles.matchHeader.scoreContainer}>
        <Text>꺼억</Text>
        <Space paddingHorizontal={5} />
        <Text>30'</Text>
      </View>
      <View style={matchListStyles.matchHeader.teamContainer}>
        <Text>O</Text>
      </View>
      <View style={matchListStyles.matchHeader.scoreContainer}>
        <Text>꺼억</Text>
        <Space paddingHorizontal={5} />
        <Text>30'</Text>
      </View>
    </View>
  );
};

export default MatchHeaderGoals;
