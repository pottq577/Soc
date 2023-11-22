import React from "react";
import { View, Text } from "react-native";
import {
  analysisStyle,
  positionBorderStyles,
  positionMapping,
} from "../../constants/constants";

const TeamSection = ({ squad, title }) => {
  const positionKey = positionMapping[title]; // 포지션 이름을 키로 변환
  const borderStyle = positionBorderStyles(positionKey); // 해당 키의 색상을 가져옴

  return (
    <View style={[analysisStyle.squad.container, borderStyle]}>
      <View style={analysisStyle.squad.header}>
        <Text style={analysisStyle.squad.headerFont.title}>{title}</Text>
        <Text style={analysisStyle.squad.headerFont.pos}>Positions</Text>
      </View>

      {squad.map((player, index) => (
        <View key={index} style={analysisStyle.squad.content}>
          <Text>{player.name}</Text>
          <Text>{player.position}</Text>
        </View>
      ))}
    </View>
  );
};

export default TeamSection;
