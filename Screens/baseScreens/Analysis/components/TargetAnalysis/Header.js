import React from "react";
import { View, Text, Image } from "react-native";
import { listStyle } from "../../constants/constants";

// 분석 화면 진입 시 나오는 화면에 대한 렌더링
const Header = ({ item, isPlayer }) => (
  <View style={{ ...listStyle.card.container, marginHorizontal: 10 }}>
    <View style={listStyle.card.text.container}>
      <Text style={listStyle.card.text.name}>{item.name}</Text>
      {/* 선수일 때만 클럽 아이콘, 클럽명 출력 */}
      {!isPlayer && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={listStyle.card.image.teamIcon} source={item.team} />
          <Text style={listStyle.card.text.teamName}>{item.teamName}</Text>
        </View>
      )}
      <Text style={listStyle.card.text.score}>등번호</Text>
    </View>
    <Image style={listStyle.card.image.photo} source={item.image} />
  </View>
);

export default Header;
