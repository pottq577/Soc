import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles, matchList } from "../constants/constants";
import { matches } from "../constants/data";

import { Space } from "../../../components/Space";

const TeamInfo = ({ name, logo, alignRight }) => {
  return (
    <View
      style={[
        matchList.teamInfo,
        alignRight
          ? { justifyContent: "flex-end" }
          : { justifyContent: "flex-start" },
      ]}
    >
      {alignRight && (
        <Text style={[matchList.text, matchList.teamName]}>{name}</Text>
      )}
      <Space padding={10} />
      <Image style={styles.icons.teamLogo} source={logo} />
      <Space padding={10} />
      {!alignRight && (
        <Text style={[matchList.text, matchList.teamName]}>{name}</Text>
      )}
    </View>
  );
};

const Cards = () => {
  return (
    <ScrollView style={{ padding: 10 }}>
      {matches.map((match, index) => (
        <View key={index} style={matchList.container}>
          <TeamInfo name={match.home} logo={match.homeLogo} alignRight={true} />
          <View style={matchList.scoreContainer}>
            <Text style={matchList.text}>{match.homeScore}</Text>
            <Text> - </Text>
            <Text style={matchList.text}>{match.awayScore}</Text>
          </View>
          <TeamInfo
            name={match.away}
            logo={match.awayLogo}
            alignRight={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const MatchCards = () => {
  return <Cards />;
};

export default MatchCards;
