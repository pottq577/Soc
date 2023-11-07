import React from "react";
import { View, Text, FlatList } from "react-native";
import { Separator, listStyle } from "../constants/constants";
import { renderTableItem } from "./RenderTable";

const FullList = ({ route }) => {
  const { category, isPlayer, data } = route.params;
  const rankOnePlayer = data.find((player) => player.rank === 1);
  const otherPlayers = data.filter((player) => player.rank !== 1);
  const modifiedData = [
    { ...rankOnePlayer, isRankOne: true },
    { isHeader: true },
    ...otherPlayers,
  ];

  return (
    <View>
      <Text style={listStyle.header}>{category}</Text>
      <FlatList
        data={modifiedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(props) => renderTableItem({ ...props, isPlayer })}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

export default FullList;
