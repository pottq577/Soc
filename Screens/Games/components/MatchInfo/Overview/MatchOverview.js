import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { analysisStyle } from "../../../constants/constants";
import MatchTimeLine from "./MatchTimeLine";
import MatchDetails from "./MatchDetails";
import MatchLineUp from "./MatchLineUp";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/constants";

const MatchOverview = ({
  match_id,
  matchDetails,
  selectedTabIndex,
  team1_name,
  team1_goals,
  team2_name,
  team2_goals,
  datetime,
  homeLogo,
  awayLogo,
  matchEvents,
}) => {
  return (
    <View style={{ padding: 10 }}>
      {/* 경기 세부 정보 카드 */}
      {/* <MatchDetails matchDetails={matchDetails} /> */}
      {/* 경기 라인 업 카드 */}
      <MatchLineUp
        match_id={match_id}
        team1Name={matchDetails.team1_name}
        team2Name={matchDetails.team2_name}
        {...{
          team1_name,
          team1_goals,
          team2_name,
          team2_goals,
          datetime,
          homeLogo,
          awayLogo,
        }}
      />
    </View>
  );
};

export default MatchOverview;
