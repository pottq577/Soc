import React from "react";
import { View, Text, FlatList } from "react-native";
import { listStyle } from "../constants/constants";
import Separator from "../../../components/Separator";
import FullListTable from "../components/Tables/FullListTable";
import { useNavigation } from "@react-navigation/native";

/**
 * 사용자가 '전체 목록' 버튼을 선택했을 때 보여줄 전체 목록 화면
 * @param route: '전체 목록' 버튼이 포함된 카드의 데이터
 * @returns FullListTable
 */
const FullList = ({ route }) => {
  const navigation = useNavigation();
  const { category, isPlayer, data } = route.params;
  const rankOnePlayer = data.find((player) => player.rank === 1);
  const otherPlayers = data.filter((player) => player.rank !== 1);
  // 1등 선수와 나머지 선수를 구분하기 위해 배열의 2번에 isHeader 추가
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
