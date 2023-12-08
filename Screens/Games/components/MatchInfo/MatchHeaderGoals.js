import React from "react";
import { View, Text } from "react-native";
import { matchListStyles } from "../../constants/constants";
import Space from "../../../../components/Space";

// TODO MatchHeader.js에서 골 데이터를 넘겨받아 화면에 출력
const MatchHeaderGoals = () => {
  return (
    <View style={{ flexDirection: "row", padding: 20 }}>
      <View style={matchListStyles.matchHeader.scoreContainer}>
        <Text>Player1</Text>
        <Space paddingHorizontal={5} />
        <Text>30'</Text>
      </View>
      <View style={matchListStyles.matchHeader.teamContainer}>
        <Text>⚽️</Text>
      </View>
      <View style={matchListStyles.matchHeader.scoreContainer}>
        <Text>Player2</Text>
        <Space paddingHorizontal={5} />
        <Text>30'</Text>
      </View>
    </View>
  );
};

export default MatchHeaderGoals;
