import React from "react";
import { Text, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useAnalysis } from "../../hooks/useAnalysis";
import { switchStyle } from "../../constants/constants";
import PassMap from "./passball/PassMap";
import BallTouch from "./passball/BallTouch";
import Section from "../Tables/PlayerSection";
// 예시 데이터
import { overviewData, recordData, statData } from "../../constants/data";

// 선수 개요 화면
const PlayerOverview = ({
  item,
  isPlayer,
  squad,
  match_id,
  team1_name,
  team1_goals,
  team2_name,
  team2_goals,
  datetime,
  homeLogo,
  awayLogo,
}) => {
  const {
    isOverviewSelected,
    setIsOverviewSelected,
    isWholeSeason,
    setIsWholeSeason,
  } = useAnalysis(); // Custom Hook 사용

  const renderContentView = () => {
    if (isPlayer) {
      <View>
        <PassMap item={item} match_id={match_id} />
        <BallTouch />
      </View>;
    } else {
      <View>
        <PassMap item={item} match_id={match_id} />
        <BallTouch />
      </View>;
    }
  };

  return (
    <View style={{ padding: 0 }}>
      {/* 섹션 컴포넌트 (예: 선수 정보, 공격, 팀 플레이 등) */}
      {/* <Section sectionTitle="선수정보" data={overviewData} isPlayer={isPlayer} />
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
    />*/}
      {/* <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["패스맵", "볼터치 위치"]}
          selectedIndex={isOverviewSelected ? 0 : 1}
          onTabPress={(index) => setIsOverviewSelected(index === 0)}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
      </View> */}
      {/* {renderContentView()} */}
      <PassMap item={item} match_id={match_id} />
      <BallTouch />
    </View>
  );
};

export default PlayerOverview;
