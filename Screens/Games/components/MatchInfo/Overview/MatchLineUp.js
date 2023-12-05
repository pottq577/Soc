import React from "react";
import { ScrollView } from "react-native";
import RenderSquad from "../../../../Analysis/components/TargetAnalysis/RenderSquad";
import { useGames } from "../../../hooks/useGames";

const MatchLineUp = ({ home, away }) => {
  const { selectedTabIndex, setSelectedTabIndex } = useGames();

  // TODO RenderSquad에서 실제 팀의 스쿼드 라인업을 출력할 것
  // 탭에 따른 컨텐츠 렌더링
  const renderTabContent = () => {
    switch (selectedTabIndex) {
      case 0: // '홈' 탭 선택 시
        return <RenderSquad isHome={selectedTabIndex} />;
      case 1: // '어웨이' 탭 선택 시
        return <RenderSquad isHome={selectedTabIndex} />;
      default:
        return null;
    }
  };

  return <ScrollView>{renderTabContent()}</ScrollView>;
};

export default MatchLineUp;
