import React from "react";
import { View, Text } from "react-native";
import { matchAnalysisStyle } from "../../../constants/constants";
import useFetchGameData from "../../../hooks/fetchGameData";

const RenderTable = ({ match_id, matchDetails, team }) => {
  const { playerName } = useFetchGameData(matchDetails, match_id, team);
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
    return playerName.map((name, index) => (
      <View key={index} style={matchAnalysisStyle.tableRow}>
        <Text style={matchAnalysisStyle.tableCell}>{name.player_name}</Text>
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
