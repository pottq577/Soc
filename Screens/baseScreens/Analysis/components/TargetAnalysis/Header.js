import React from "react";
import { View, Text, Image } from "react-native";
import { listStyle } from "../../constants/constants";

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
