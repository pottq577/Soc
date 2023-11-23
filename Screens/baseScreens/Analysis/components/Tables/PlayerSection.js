import React from "react";
import { View, Text } from "react-native";
import { analysisStyle } from "../../constants/constants";
import PlayerInfoRow from "./PlayerInfoRow";

// 선수 정보에 대한 컨테이너 뷰
const PlayerSection = ({ sectionTitle, data, isPlayer }) => (
  <View style={analysisStyle.container}>
    <Text style={analysisStyle.header}>{sectionTitle}</Text>
    {Object.entries(data).map(([key, value]) => (
      // 개별 정보를 보여주는 컴포넌트 (InfoRow)
      <PlayerInfoRow key={key} label={key} value={value} />
    ))}
  </View>
);

export default PlayerSection;
