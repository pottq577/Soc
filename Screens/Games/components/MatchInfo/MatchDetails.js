// MatchDetails.js
import React from "react";
import { View, Text } from "react-native";
import { overviewStyle } from "../../constants/constants";

const MatchDetailCard = ({ homeData, awayData, label }) => {
  return (
    <View style={overviewStyle.details.container}>
      <Text style={overviewStyle.details.teamData}>{homeData}</Text>
      <Text style={overviewStyle.details.label}>{label}</Text>
      <Text style={overviewStyle.details.teamData}>{awayData}</Text>
    </View>
  );
};

const MatchDetails = ({ matchDetails }) => {
  return (
    <View style={overviewStyle.details.container}>
      <MatchDetailCard
        homeData={matchDetails.possession.home}
        awayData={matchDetails.possession.away}
        label="점유율"
      />
      <MatchDetailCard
        homeData={matchDetails.expectedGoals.home}
        awayData={matchDetails.expectedGoals.away}
        label="기대 골 (xG)"
      />
      <MatchDetailCard
        homeData={matchDetails.shots.home}
        awayData={matchDetails.shots.away}
        label="슈팅"
      />
      <MatchDetailCard
        homeData={matchDetails.onTarget.home}
        awayData={matchDetails.onTarget.away}
        label="유효 슈팅"
      />
    </View>
  );
};

export default MatchDetails;
