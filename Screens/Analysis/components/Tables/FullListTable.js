import React from "react";
import FullListFirst from "./FullListFirst";
import FullListTableHeader from "./FullListTableHeader";
import FullListTableRow from "./FullListTableRow";

/**
 * 전체 목록 보기 테이블에 대한 구현
 * @param item.isRankOne: 1등 선수인지
 * @returns
 */
// 전체 목록 테이블에 대한 구현
const FullListTable = ({ item, isPlayer, navigation }) => {
  /**
   * 리스트에서 선수 / 팀 선택 시 Target.js로 네비게이션
   * @param item: 선택한 선수 / 팀의 데이터
   */
  const handlePress = () => {
    navigation.navigate("Target", { item, isPlayer });
  };
  // 리스트 중 첫 번째 선수(팀) 출력
  if (item.isRankOne) {
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
