import React from "react";
import { View, Text, FlatList } from "react-native";
import { Separator, listStyle } from "../constants/constants";
import FullListTable from "../components/Tables/FullListTable";
import { useNavigation } from "@react-navigation/native";

const FullList = ({ route }) => {
  const navigation = useNavigation();
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
        renderItem={(props) =>
          FullListTable({ ...props, isPlayer, navigation })
        }
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

export default FullList;
