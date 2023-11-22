import React from "react";
import { View, Text } from "react-native";
import { analysisStyle } from "../../constants/constants";

const TeamAnalysisView = ({
  match,
  item,
  selectedPlayer,
  selectedAnalysisType,
}) => {
  return (
    <View style={analysisStyle.matchAnalysis.analysisView}>
      <Text>분석 화면</Text>
      <Text>{`선택된 선수: ${selectedPlayer}`}</Text>
      <Text>{`선택된 분석 유형: ${selectedAnalysisType}`}</Text>
    </View>
  );
};

export default TeamAnalysisView;
