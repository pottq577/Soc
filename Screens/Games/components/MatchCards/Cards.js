import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { matchListStyles } from "../../constants/constants";
import TeamInfo from "./TeamInfo";

const Cards = ({ index, match, onPress }) => {
  return (
    <TouchableOpacity key={index} onPress={onPress}>
      <View style={matchListStyles.container}>
        <Text style={{ paddingBottom: 13 }}>{match.datetime}</Text>
        {/* 홈, 득점, 어웨이 */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TeamInfo name={match.home} logo={match.homeLogo} alignRight={true} />
          <View style={matchListStyles.scoreContainer}>
            <Text style={matchListStyles.score}>{match.homeScore}</Text>
            <Text style={matchListStyles.score}> - </Text>
            <Text style={matchListStyles.score}>{match.awayScore}</Text>
          </View>
          <TeamInfo
            name={match.away}
            logo={match.awayLogo}
            alignRight={false}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Cards;
