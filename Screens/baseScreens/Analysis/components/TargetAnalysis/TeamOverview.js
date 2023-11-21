import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  leagueData,
  listStyle,
  analysisStyle,
} from "../../constants/constants";

// 공통 테이블 셀 스타일
const TableCell = ({ children, flex, isHeader }) => (
  <Text
    style={[
      listStyle.table.row.cell,
      { flex },
      isHeader && analysisStyle.team.tableHeader, // 헤더 텍스트 스타일 추가
    ]}
  >
    {children}
  </Text>
);

const TeamOverview = () => {
  // 테이블 로우 컴포넌트
  const TableRow = ({ team }) => (
    <TouchableOpacity style={listStyle.table.row.container}>
      <TableCell flex={1}>{team.rank}</TableCell>
      <TableCell flex={4}>{team.teamName}</TableCell>
      <TableCell flex={1}>{team.wins}</TableCell>
      <TableCell flex={1}>{team.draws}</TableCell>
      <TableCell flex={1}>{team.losses}</TableCell>
      <TableCell flex={1}>{team.points}</TableCell>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 10 }}>
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>리그명</Text>
        {/* 테이블 헤더 */}
        <View
          style={{
            ...listStyle.table.header.container,
            borderBottomWidth: 0.7,
            marginBottom: 10,
          }}
        >
          <TableCell flex={1} isHeader>
            순위
          </TableCell>
          <TableCell flex={4} isHeader>
            팀명
          </TableCell>
          <TableCell flex={1} isHeader>
            승
          </TableCell>
          <TableCell flex={1} isHeader>
            무
          </TableCell>
          <TableCell flex={1} isHeader>
            패
          </TableCell>
          <TableCell flex={1} isHeader>
            승점
          </TableCell>
        </View>
        {/* 테이블 로우 */}
        {leagueData.map((team, index) => (
          <TableRow key={index} team={team} />
        ))}
      </View>
    </View>
  );
};

export default TeamOverview;
