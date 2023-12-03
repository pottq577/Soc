import React from "react";
import { View } from "react-native";
import Section from "../Tables/PlayerSection";
import RadarChart from "./RadarChart";
// 예시 데이터
import { overviewData, recordData, statData } from "../../constants/data";

// 선수 개요 화면
const PlayerOverview = ({ isPlayer }) => (
  <View style={{ padding: 10 }}>
    {/* 섹션 컴포넌트 (예: 선수 정보, 공격, 팀 플레이 등) */}
    <Section sectionTitle="선수정보" data={overviewData} isPlayer={isPlayer} />
    <Section
      sectionTitle="프리미어 리그 기록"
      data={recordData}
      isPlayer={isPlayer}
    />
    <Section sectionTitle="공격" data={statData.Attack} isPlayer={isPlayer} />
    <Section
      sectionTitle="팀 플레이"
      data={statData.Team_Play}
      isPlayer={isPlayer}
    />
    {isPlayer && <RadarChart />}
  </View>
);

export default PlayerOverview;
