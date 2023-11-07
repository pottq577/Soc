import React from "react";
import { ScrollView, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import SeasonPickerView from "./components/SeasonPickerView";
import CardContent from "./components/CardContent";
import { Separator, styles, switchStyle, SEASONS } from "./constants/constants";
import { useAnalysis } from "./hooks/useAnalysis";

const AnalysisScreen = () => {
  const {
    state: { selectedSeason, isPlayerSelected, menuVisible },
    toggleMenu,
    setIsPlayerSelected,
    setSelectedSeason,
  } = useAnalysis(); // Custom Hook 사용

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        {/* 선수 / 팀 선택 */}
        <SegmentedControlTab
          values={["선수", "팀"]}
          selectedIndex={isPlayerSelected ? 0 : 1}
          onTabPress={(index) => setIsPlayerSelected(index === 0)}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
        {/* 시즌 선택 뷰 */}
        <SeasonPickerView
          selectedSeason={selectedSeason}
          seasons={SEASONS}
          menuVisible={menuVisible}
          toggleMenu={toggleMenu}
          setSelectedSeason={setSelectedSeason}
        />
      </View>
      <Separator />
      {/* 카드 뷰 */}
      <CardContent
        selectedSeason={selectedSeason}
        isPlayerSelected={isPlayerSelected}
      />
    </ScrollView>
  );
};

export default AnalysisScreen;
