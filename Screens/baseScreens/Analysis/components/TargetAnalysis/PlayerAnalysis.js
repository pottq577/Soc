import React from "react";
import { View } from "react-native";
import Section from "./Section";
import { statData } from "../../constants/constants";
import RadarChart from "./RadarChart";

const PlayerAnalysis = ({ isPlayer }) => (
  <View style={{ padding: 10 }}>
    <RadarChart />
    {/* 섹션 컴포넌트 (예: 선수 정보, 공격, 팀 플레이 등) */}
    <Section sectionTitle="공격" data={statData.Attack} isPlayer={isPlayer} />
    <Section
      sectionTitle="팀 플레이"
      data={statData.Team_Play}
      isPlayer={isPlayer}
    />
  </View>
);

export default PlayerAnalysis;
