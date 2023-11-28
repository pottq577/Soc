import React from "react";
import FullListFirst from "./FullListFirst";
import FullListTableHeader from "./FullListTableHeader";
import FullListTableRow from "./FullListTableRow";

// 전체 목록 테이블에 대한 구현
const FullListTable = ({ item, isPlayer, navigation }) => {
  const handlePress = () => {
    navigation.navigate("Target", { item, isPlayer });
  };
  if (item.isRankOne) {
    // 리스트 중 첫 번째 선수(팀) 출력
    <FullListFirst isPlayer={isPlayer} item={item} handlePress={handlePress} />;
  } else if (item.isHeader) {
    // 테이블 헤더 출력
    return <FullListTableHeader isPlayer={isPlayer} />;
  } else {
    return (
      // 1등을 제외한 나머지 선수(팀) 출력
      <FullListTableRow
        item={item}
        isPlayer={isPlayer}
        navigation={navigation}
      />
    );
  }
};

export default FullListTable;
