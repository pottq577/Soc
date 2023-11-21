import React from "react";
import { View, Text } from "react-native";
import { analysisStyle } from "../../constants/constants";
import PlayerInfoRow from "./PlayerInfoRow";
import TeamInfoRow from "./TeamInfoRow";

const Section = ({ sectionTitle, data, isPlayer }) => (
  <View style={analysisStyle.container}>
    <Text style={analysisStyle.header}>{sectionTitle}</Text>
    {/* 선수일 때 PlayerInfoRow, 팀일 때 TeamInfoRow */}
    {Object.entries(data).map(([key, value]) => (
      // 개별 정보를 보여주는 컴포넌트 (InfoRow)
      <PlayerInfoRow key={key} label={key} value={value} />
    ))}
  </View>
);

export default Section;
