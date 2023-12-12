import React from "react";
import { View, ScrollView, Image, Text } from "react-native";
import { matchAnalysisStyle } from "../../../constants/constants";
import RenderTable from "./RenderTable";
import useFetchGameData from "../../../hooks/fetchGameData";

const AnalysisTeam = ({ matchDetails, match_id, team }) => {
  const { imageData, playerStats } = useFetchGameData(
    matchDetails,
    match_id,
    team
  );
  // console.log( "Get Image Data URL: ", `../matchAnalysis/${match_id}/${team}`);

  return (
    <View>
      {imageData && (
        <Image
          source={{ uri: imageData }}
          resizeMode="contain"
          style={matchAnalysisStyle.passNetwork}
        />
      )}
      <ScrollView style={{ marginBottom: 50 }}>
        <RenderTable playerStats={playerStats} />
      </ScrollView>
    </View>
  );
};

export default AnalysisTeam;
