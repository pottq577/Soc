import React from "react";
import { View, ScrollView } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import {
  switchStyle,
  overviewData,
  recordData,
  statData,
} from "../constants/constants";
import { useAnalysis } from "../hooks/useAnalysis";
import RadarChart from "../components/RadarChart";
import Section from "../components/Section";
import PlayerHeader from "../components/PlayerHeader";

const Target = ({ route }) => {
  const { item, isPlayer } = route.params;
  const { isOverviewSelected, setIsOverviewSelected } = useAnalysis(); // Custom Hook 사용

  const OverviewView = () => (
    <View style={{ padding: 10 }}>
      {/* 섹션 컴포넌트 (예: 선수 정보, 공격, 팀 플레이 등) */}
      <Section sectionTitle="선수정보" data={overviewData} />
      <Section sectionTitle="프리미어 리그 기록" data={recordData} />
    </View>
  );

  const AnalysisView = () => (
    <View style={{ padding: 10 }}>
      <RadarChart />
      {/* 섹션 컴포넌트 (예: 선수 정보, 공격, 팀 플레이 등) */}
      <Section sectionTitle="공격" data={statData.Attack} />
      <Section sectionTitle="팀 플레이" data={statData.Team_Play} />
    </View>
  );

  const renderContentView = () => {
    return isOverviewSelected ? <OverviewView /> : <AnalysisView />;
  };

  return (
    <ScrollView>
      {/* 선수 정보 헤더 */}
      <PlayerHeader item={item} isPlayer={isPlayer} />
      {/* 개요 / 분석 선택 탭 */}
      <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["개요", "스탯"]}
          selectedIndex={isOverviewSelected ? 0 : 1}
          onTabPress={(index) => setIsOverviewSelected(index === 0)}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
      </View>
      <View>{renderContentView()}</View>
    </ScrollView>
  );
};

export default Target;
