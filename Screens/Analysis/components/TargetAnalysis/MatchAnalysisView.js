import React from "react";
import { View, Text } from "react-native";
import { analysisStyle } from "../../constants/constants";

/**
 * 사용자가 선수(팀)에 대한 분석 진행 시 보여줄 화면
 * 선수, 분석 종류 선택하여 back-end에서 작업한 내용 출력
 */
const MatchAnalysisView = ({
  match,
  item,
  selectedPlayer,
  selectedAnalysisType,
  isPlayer,
  isWholeSeason,
}) => {
  // 시즌 전체 분석 뷰
  const renderWholeSeasonView = () => {
    return (
      <View style={analysisStyle.matchAnalysis.analysisView}>
        <Text>시즌 전체 분석</Text>
        {/* 시즌 전체 분석에 필요한 추가 정보 또는 컴포넌트 */}
        <Text>{`isPlayer: ${isPlayer}`}</Text>
        <Text>{`isWholeSeason: ${isWholeSeason}`}</Text>
      </View>
    );
  };

  // 특정 경기 분석 뷰
  const renderMatchView = () => {
    return (
      <View style={analysisStyle.matchAnalysis.analysisView}>
        <Text>분석 화면</Text>
        {/* 팀 분석일 때만 선수 선택 표시 */}
        {isPlayer && <Text>{`선택된 선수: ${selectedPlayer}`}</Text>}
        <Text>{`선택된 분석 유형: ${selectedAnalysisType}`}</Text>
        <Text>{`매치 정보 (date): ${match.date}`}</Text>
        <Text>{`매치 정보 (score): ${match.score}`}</Text>
        <Text>{`isPlayer: ${isPlayer}`}</Text>
        <Text>{`isWholeSeason: ${isWholeSeason}`}</Text>
      </View>
    );
  };

  return (
    <View>{isWholeSeason ? renderWholeSeasonView() : renderMatchView()}</View>
  );
};

export default MatchAnalysisView;
