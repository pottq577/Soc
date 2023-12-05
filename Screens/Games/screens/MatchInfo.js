import React from "react";
import { View, ScrollView } from "react-native";
import MatchHeader from "../components/MatchInfo/MatchHeader";
import Separator from "../../../components/Separator";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { switchStyle } from "../constants/constants";
import MatchLineUp from "../components/MatchInfo/MatchLineUp";
import MatchOverview from "../components/MatchInfo/MatchOverview";
import { useGames } from "../hooks/useGames";

const MatchInfo = ({ route }) => {
  const { home, homeScore, homeLogo, away, awayScore, awayLogo, datetime } =
    route.params;
  const { selectedTabIndex, setSelectedTabIndex } = useGames();

  // 렌더링할 컨텐츠를 결정하는 함수
  const renderContentView = () => {
    switch (selectedTabIndex) {
      case 0: // '개요' 탭 선택 시
        return <MatchOverview home={home} away={away} datetime={datetime} />;
      case 1: // '라인업' 탭 선택 시
      // return <MatchLineUp home={home} away={away} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <MatchHeader
        home={home}
        homeScore={homeScore}
        homeLogo={homeLogo}
        away={away}
        awayScore={awayScore}
        awayLogo={awayLogo}
      />
      <Separator />
      <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["개요", "경기 분석"]}
          selectedIndex={selectedTabIndex}
          onTabPress={setSelectedTabIndex}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
      </View>
      {renderContentView()}
    </ScrollView>
  );
};

export default MatchInfo;
