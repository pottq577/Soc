import React from "react";
import { View } from "react-native";
import Separator from "../../components/Separator";
import LeagueCalendarIcon from "./components/LeagueCalendarIcon";
import Calendar from "./components/Calendar";
import MatchCards from "./screens/MatchCards";
import { switchStyle } from "./constants/constants";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useModal } from "./hooks/useModal";

const GameScreen = () => {
  const { selectedTabIndex, setSelectedTabIndex } = useModal();

  // 탭에 따른 컨텐츠 렌더링
  const renderTabContent = () => {
    switch (selectedTabIndex) {
      case 0: // '경기 일정' 탭 선택 시
        return <MatchCards />;
      case 1: // '리그 순위' 탭 선택 시
      // return <LeagueRanking />;
      default:
        return null;
    }
  };

  return (
    <View>
      {/* 리그 아이콘, 달력 아이콘 */}
      <LeagueCalendarIcon selectedTabIndex={selectedTabIndex} />
      {/* 날짜 선택 (경기 일정 탭에서만 보이도록) */}
      {selectedTabIndex === 0 && <Calendar />}

      <Separator />

      {/* 탭 선택 컨트롤 */}
      <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["경기 일정", "리그 순위"]}
          selectedIndex={selectedTabIndex}
          onTabPress={setSelectedTabIndex}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
      </View>
      {renderTabContent()}
    </View>
  );
};

export default GameScreen;
