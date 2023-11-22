import React from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAnalysis } from "../hooks/useAnalysis";
import { analysisStyle } from "../constants/constants";
import AnalysisPicker from "../components/AnalysisPicker";
import TeamAnalysisView from "../components/TargetAnalysis/TeamAnalysisView";

const players = [
  { label: "Erling Haaland", value: "Erling Haaland" },
  { label: "Mohamed Salah", value: "Mohamed Salah" },
  { label: "Kevin De Bruyne", value: "Kevin De Bruyne" },
  // ... 기타 선수들
];

const analysisTypes = [
  "이벤트 발생 위치",
  "패스 경로",
  "슈팅 히트맵",
  "속력 그래프",
  "볼 히트맵",
  "스프린트 경로",
  "패스 네트워크",
];

const Example = ({ match, item }) => {
  return (
    <View>
      <Text>{`날짜: ${match.date}`}</Text>
      {/* match.home은 예시 데이터로, item.name을 사용하여 사용자가 선택한 팀의 팀명을 출력 */}
      <Text>{`선택 팀: ${match.home}`}</Text>
      {/* <Text>{`선택 팀: ${item.name}`}</Text> */}
      <Text>{`상대 팀: ${match.away}`}</Text>
      <Text>{`점수: ${match.score}`}</Text>
    </View>
  );
};

const MatchInfo = ({ match, item }) => {
  return (
    <View style={analysisStyle.matchAnalysis.headerContainer}>
      <Text style={analysisStyle.matchList.teamFont}>{match.home}</Text>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "grey" }}>{match.date}</Text>
        <Text style={{ fontSize: 30 }}>{match.score}</Text>
      </View>
      <Text style={analysisStyle.matchList.teamFont}>{match.away}</Text>
    </View>
  );
};

const MatchAnalysis = () => {
  const route = useRoute();
  const { match, item } = route.params;
  const {
    selectedPlayer,
    setSelectedPlayer,
    selectedAnalysisType,
    setSelectedAnalysisType,
    togglePlayerMenu,
    toggleAnalysisTypeMenu,
    playerMenuVisible,
    analysisTypeMenuVisible,
  } = useAnalysis(players[0].label, analysisTypes[0]);

  return (
    <>
      <MatchInfo item={item} match={match} />
      <TeamAnalysisView
        item={item}
        match={match}
        selectedPlayer={selectedPlayer}
        selectedAnalysisType={selectedAnalysisType}
      />
      <View style={{ height: 150, paddingTop: 20 }}>
        {/* 선수 선택 Picker */}
        <AnalysisPicker
          items={players.map((player) => ({
            label: player.label,
            value: player.value,
          }))}
          selectedItem={selectedPlayer}
          setSelectedItem={setSelectedPlayer}
          toggleMenu={togglePlayerMenu}
          menuVisible={playerMenuVisible}
        />
        {/* 분석 선택 Picker */}
        <AnalysisPicker
          items={analysisTypes.map((type) => ({ label: type, value: type }))}
          selectedItem={selectedAnalysisType}
          setSelectedItem={setSelectedAnalysisType}
          toggleMenu={toggleAnalysisTypeMenu}
          menuVisible={analysisTypeMenuVisible}
        />
      </View>
    </>
  );
};

export default MatchAnalysis;
