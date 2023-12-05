import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { matchListStyles } from "../../constants/constants";
import TeamInfo from "./TeamInfo";

const Cards = ({ index, match, onPress }) => {
  return (
    <TouchableOpacity key={index} onPress={onPress}>
      <View style={matchListStyles.container}>
        <Text style={{ paddingBottom: 13 }}>{match.datetime}</Text>
        {/* 홈, 득점, 어웨이 */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TeamInfo
            name={match.team1_name}
            logo={match.homeLogo}
            alignRight={true}
          />
          <View style={matchListStyles.scoreContainer}>
            <Text style={matchListStyles.score}>{match.team1_goals}</Text>
            <Text style={matchListStyles.score}> - </Text>
            <Text style={matchListStyles.score}>{match.team2_goals}</Text>
          </View>
          <TeamInfo
            name={match.team2_name}
            logo={match.awayLogo}
            alignRight={false}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Cards;
