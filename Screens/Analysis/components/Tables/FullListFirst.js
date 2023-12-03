import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { listStyle } from "../../constants/constants";

// 리스트 중 첫 번째 선수(팀)에 대한 뷰
const FullListFirst = ({ isPlayer, item, handlePress }) => {
  return (
    <View style={listStyle.container}>
      <TouchableOpacity onPress={handlePress} style={listStyle.card.container}>
        <View style={listStyle.card.text.container}>
          <Text style={listStyle.card.text.rank}>{item.rank}</Text>
          <Text style={listStyle.card.text.name}>{item.name}</Text>
          {/* 선수 목록일 때만 팀 로고, 팀명 출력 */}
          {isPlayer && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={listStyle.card.image.teamIcon} source={item.team} />
              <Text style={listStyle.card.text.teamName}>{item.teamName}</Text>
            </View>
          )}
          <Text style={listStyle.card.text.score}>{item.score}</Text>
        </View>
        <Image style={listStyle.card.image.photo} source={item.image} />
      </TouchableOpacity>
    </View>
  );
};

export default FullListFirst;
