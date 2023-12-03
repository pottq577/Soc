import React from "react";
import { View, ScrollView } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { switchStyle } from "../../constants/constants";
import RenderSquad from "../../../Analysis/components/TargetAnalysis/RenderSquad";
import Space from "../../../../components/Space";
import { useGames } from "../../hooks/useGames";

const MatchLineUp = () => {
  const { selectedTabIndex, setSelectedTabIndex } = useGames();

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

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["홈", "어웨이"]}
          selectedIndex={selectedTabIndex}
          onTabPress={setSelectedTabIndex}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
      </View>
      <Space paddingVertical={5} />
      {renderTabContent()}
    </ScrollView>
  );
};

export default MatchLineUp;
