import React from "react";
import { View, Text } from "react-native";
import { listStyle } from "../../constants/constants";

/**
 * 전체 목록에서 테이블의 헤더를 출력하는 뷰
 * @param isPlayer: 선수 / 팀 구분
 */
const FullListTableHeader = ({ isPlayer }) => {
  const titles = isPlayer
    ? [
        { text: "순위", flex: 1 },
        { text: "팀명", flex: 4 },
        { text: "득점수", flex: 1 },
      ]
    : [
        { text: "순위", flex: 1 },
        { text: "선수명", flex: 4 },
        { text: "팀", flex: 2 },
        { text: "득점수", flex: 1 },
      ];

  return (
    <View style={listStyle.table.header.container}>
      {titles.map((title, index) => (
        <Text
          key={index}
          style={[listStyle.table.header.cell, { flex: title.flex }]}
        >
          {title.text}
        </Text>
      ))}
    </View>
  );
};

export default FullListTableHeader;
