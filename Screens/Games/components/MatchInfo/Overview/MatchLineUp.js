import React from "react";
import { ScrollView } from "react-native";
import RenderSquad from "../../../../Analysis/components/TargetAnalysis/RenderSquad";
import { useGames } from "../../../hooks/useGames";

const MatchLineUp = ({ homeLineup, awayLineup, match_id }) => {
  const { selectedTabIndex, setSelectedTabIndex } = useGames();

  // TODO RenderSquad에서 실제 팀의 스쿼드 라인업을 출력할 것
  // 탭에 따른 컨텐츠 렌더링
  const renderTabContent = () => {
    const players = selectedTabIndex === 0 ? homeLineup : awayLineup;
    return (
      <RenderSquad
        match_id={match_id}
        homeLineup={homeLineup}
        awayLineup={awayLineup}
      />
    );
  };

  return <ScrollView>{renderTabContent()}</ScrollView>;
};

export default MatchLineUp;
