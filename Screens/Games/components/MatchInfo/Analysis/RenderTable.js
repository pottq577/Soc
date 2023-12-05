import React from "react";
import { View, Text } from "react-native";
import { matchAnalysisStyle } from "../../../constants/constants";

const RenderTable = ({ playerStats }) => {
  const tableHeaders = ["선수명", "골", "어시스트", "패스 수", "패스 정확도"];

  const renderTableHeader = () => (
    <View style={matchAnalysisStyle.tableRowHeader}>
      {tableHeaders.map((header, index) => (
        <Text key={index} style={matchAnalysisStyle.tableHeaderCell}>
          {header}
        </Text>
      ))}
    </View>
  );

  const renderTableRows = () => {
    return playerStats.map((stat, index) => (
      <View key={index} style={matchAnalysisStyle.tableRow}>
        <Text style={matchAnalysisStyle.tableCell}>{stat.player_name}</Text>
        <Text style={matchAnalysisStyle.tableCell}>{stat.goals}</Text>
        <Text style={matchAnalysisStyle.tableCell}>{stat.assists}</Text>
        <Text style={matchAnalysisStyle.tableCell}>{stat.total_passes}</Text>
        <Text style={matchAnalysisStyle.tableCell}>
          {(stat.pass_accuracy * 100).toFixed(0)}%
        </Text>
      </View>
    ));
  };

  return (
    <View>
      {renderTableHeader()}
      {renderTableRows()}
    </View>
  );
};

export default RenderTable;
