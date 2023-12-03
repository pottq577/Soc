import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { listStyle } from "../../constants/constants";

/**
 * 첫 번째 선수(팀)을 제외한 나머지 리스트 출력
 * @param item: 사용자가 선수 / 팀을 선택했을 때 Target.js로 데이터를 넘겨줌
 * @param isPlayer: 사용자가 선수 / 팀을 선택했는지 확인
 * @returns
 */
const FullListTableRow = ({ item, isPlayer, navigation }) => {
  const handlePress = () => {
    navigation.navigate("Target", { item, isPlayer });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={listStyle.table.row.container}
    >
      <Text style={[listStyle.table.row.cell, { flex: 1 }]}>{item.rank}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 4 }}>
        {/* 팀 전체 목록일 때만 팀 로고 출력 */}
        {!isPlayer && (
          <Image style={listStyle.table.row.image} source={item.image} />
        )}
        <Text style={[listStyle.table.row.cell, { flex: 4 }]}>{item.name}</Text>
      </View>
      {/* 선수 전체 목록일 때만 팀 로고 출력  */}
      {isPlayer && (
        <View style={[listStyle.table.row.cell, { flex: 2 }]}>
          <Image style={listStyle.table.row.image} source={item.team} />
        </View>
      )}
      <Text style={[listStyle.table.row.cell, { flex: 1 }]}>{item.score}</Text>
    </TouchableOpacity>
  );
};

export default FullListTableRow;
