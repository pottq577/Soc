import React from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAnalysis } from "../hooks/useAnalysis";
import {
  analysisStyle,
  analysisTypes,
  pickerType,
} from "../constants/constants";
import AnalysisPickerContainer from "../components/TargetAnalysis/AnalysisPickerContainer";
import MatchAnalysisView from "../components/TargetAnalysis/MatchAnalysisView";
import { players } from "../constants/data";

const MatchHeader = ({ match, item }) => {
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
  const { match, item, isPlayer } = route.params;
  const {
    selectedPlayer,
    setSelectedPlayer,
    selectedAnalysisType,
    setSelectedAnalysisType,
    togglePlayerMenu,
    toggleAnalysisTypeMenu,
    activePicker,
    setActivePicker,
  } = useAnalysis(players[0].label, analysisTypes[0]);

  // 각 Picker의 메뉴 토글 함수
  const togglePicker = (picker) => {
    setActivePicker(activePicker === picker ? null : picker);
    if (picker === pickerType.player) {
      togglePlayerMenu();
    } else {
      toggleAnalysisTypeMenu();
    }
  };

  return (
    <>
      {/* 화면 최상단 경기 정보 */}
      <MatchHeader item={item} match={match} />
      {/* 사용자가 선택한 분석을 보여줄 뷰 */}
      <MatchAnalysisView
        item={item}
        match={match}
        selectedPlayer={selectedPlayer}
        selectedAnalysisType={selectedAnalysisType}
        isPlayer={isPlayer}
      />
      {/* 선수 선택(팀 분석일 때), 분석 종류 선택 Picker 뷰 */}
      <View style={{ paddingTop: 20 }}>
        {/* 선수 선택 Picker */}
        {isPlayer && (
          <AnalysisPickerContainer
            picker={pickerType.player}
            activePicker={activePicker}
            togglePicker={() => togglePicker(pickerType.player)}
            items={players}
            selectedItem={selectedPlayer}
            setSelectedItem={setSelectedPlayer}
          />
        )}
        {/* 분석 종류 Picker */}
        <AnalysisPickerContainer
          picker={pickerType.analysisType}
          activePicker={activePicker}
          togglePicker={() => togglePicker(pickerType.analysisType)}
          items={analysisTypes}
          selectedItem={selectedAnalysisType}
          setSelectedItem={setSelectedAnalysisType}
        />
      </View>
    </>
  );
};

export default MatchAnalysis;
