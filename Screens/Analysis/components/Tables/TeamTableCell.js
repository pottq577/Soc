import React from "react";
import { Text } from "react-native";
import { listStyle, analysisStyle } from "../../constants/constants";

// 실제 데이터에 대한 출력
const TeamTableCell = ({ children, flex, isHeader }) => {
  return (
    <Text
      style={[
        listStyle.table.row.cell,
        { flex },
        isHeader && analysisStyle.team.tableHeader,
      ]}
    >
      {children}
    </Text>
  );
};

export default TeamTableCell;
