import React from "react";
import { View } from "react-native";
import Section from "./Section";
import { overviewData, recordData } from "../../constants/constants";

const PlayerOverview = ({ isPlayer }) => (
  <View style={{ padding: 10 }}>
    {/* 섹션 컴포넌트 (예: 선수 정보, 공격, 팀 플레이 등) */}
    <Section sectionTitle="선수정보" data={overviewData} isPlayer={isPlayer} />
    <Section
      sectionTitle="프리미어 리그 기록"
      data={recordData}
      isPlayer={isPlayer}
    />
  </View>
);

export default PlayerOverview;
