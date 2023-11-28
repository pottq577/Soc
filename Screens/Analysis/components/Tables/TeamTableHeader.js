// TeamTableHeader.js
import React from "react";
import { View } from "react-native";
import TeamTableCell from "./TeamTableCell";
import { listStyle } from "../../constants/constants";

// 순위, 팀명 등 테이블 헤더 뷰
const TeamTableHeader = ({ headers }) => (
  <View
    style={{
      ...listStyle.table.header.container,
      borderBottomWidth: 0.7,
      marginBottom: 10,
    }}
  >
    {headers.map((header, index) => (
      <TeamTableCell key={index} flex={header.flex} isHeader>
        {header.text}
      </TeamTableCell>
    ))}
  </View>
);

export default TeamTableHeader;
