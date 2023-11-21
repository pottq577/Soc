import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  leagueData,
  squadData,
  listStyle,
  analysisStyle,
  positionBorderStyles,
  positionMapping,
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

  // 각 포지션별 선수 목록을 렌더링하는 함수
  const renderSquad = (squad, title) => {
    const positionKey = positionMapping[title]; // 포지션 이름을 키로 변환
    const borderStyle = positionBorderStyles(positionKey); // 해당 키의 색상을 가져옴

    return (
      <View style={[analysisStyle.squad.container, borderStyle]}>
        <View style={analysisStyle.squad.header}>
          <Text style={analysisStyle.squad.headerFont.title}>{title}</Text>
          <Text style={analysisStyle.squad.headerFont.pos}>Positions</Text>
        </View>

        {squad.map((player, index) => (
          <View key={index} style={analysisStyle.squad.content}>
            <Text>{player.name}</Text>
            <Text>{player.position}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <View style={analysisStyle.container}>
        <Image
          source={require("../../../../../constants/premier-league-logo.png")}
          style={{ width: 130, height: 26 }}
        />
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
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>스쿼드</Text>
        {renderSquad(squadData.attackers, "Attackers")}
        {renderSquad(squadData.midfielders, "Midfielders")}
        {renderSquad(squadData.defenders, "Defenders")}
        {renderSquad(squadData.goalkeepers, "Goalkeepers")}
      </View>
    </View>
  );
};

export default TeamOverview;
