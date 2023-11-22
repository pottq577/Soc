import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import RadarChart from "./RadarChart";
import { analysisStyle, seasonStyle, IMAGES } from "../../constants/constants";

const SelectMatch = () => {
  return (
    <View style={{ ...analysisStyle.container, flexDirection: "row" }}>
      <Text style={analysisStyle.header}>경기 분석</Text>
      <TouchableOpacity style={analysisStyle.selectMatch}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>경기 선택 ...</Text>
        <Image style={seasonStyle.button.icon} source={IMAGES.RIGHT_ARROW} />
      </TouchableOpacity>
    </View>
  );
};

const PlayerAnalysis = ({ isPlayer }) => (
  <View style={{ padding: 10 }}>
    {/* 경기 선택 */}
    <SelectMatch />
    {/* 레이더 차트 */}
    <RadarChart />
  </View>
);

export default PlayerAnalysis;
