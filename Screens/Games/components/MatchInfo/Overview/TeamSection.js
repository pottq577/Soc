import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  analysisStyle,
  positionBorderStyles,
  positionMapping,
} from "../../../constants/constants";
import { useNavigation } from "@react-navigation/native";

// 사용자가 선택한 팀의 스쿼드 출력
const TeamSection = ({
  squad,
  title,
  match_id,
  team1_name,
  team1_goals,
  team2_name,
  team2_goals,
  datetime,
  homeLogo,
  awayLogo,
  teamType,
}) => {
  const positionKey = positionMapping[title]; // 포지션 이름을 키로 변환
  const borderStyle = positionBorderStyles(positionKey); // 해당 키의 색상을 가져옴
  const validSquad = Array.isArray(squad) ? squad : [];
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate("Target", {
      squad,
      item,
      isPlayer: true,
      isGame: true,
      match_id,
      team1_name,
      team1_goals,
      team2_name,
      team2_goals,
      datetime,
      homeLogo,
      awayLogo,
      teamType,
    });
  };

  return (
    <View style={[analysisStyle.squad.container, borderStyle]}>
      <View style={analysisStyle.squad.header}>
        <Text style={analysisStyle.squad.headerFont.title}>{title}</Text>
        <Text style={analysisStyle.squad.headerFont.pos}>Positions</Text>
      </View>

      {validSquad.map((player, index) => (
        <TouchableOpacity
          onPress={() => handlePress(player)}
          key={index}
          style={analysisStyle.squad.content}
        >
          <Text>{player.shortname}</Text>
          <Text>{player.role_code2}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TeamSection;
