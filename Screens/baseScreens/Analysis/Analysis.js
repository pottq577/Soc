import React from "react";
import { ScrollView, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import SeasonPickerView from "./screens/SeasonPickerView";
import CategoryPickerView from "./screens/CategoryPickerView";
import CardContent from "./screens/CardContent";
import { useAnalysis } from "./hooks/useAnalysis";
import {
  Separator,
  styles,
  switchStyle,
  SEASONS,
  CATEGORIES,
} from "./constants/constants";

const AnalysisScreen = () => {
  const {
    isPlayerSelected,
    setIsPlayerSelected,
    menuVisible,
    toggleMenu,
    selectedSeason,
    setSelectedSeason,
    selectedCategory,
    setSelectedCategory,
  } = useAnalysis(); // Custom Hook 사용
  const currentCategories = isPlayerSelected
    ? CATEGORIES.PLAYER
    : CATEGORIES.TEAMS;

  const onCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 상단 메뉴 컴포넌트 컨테이너 */}
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
        {/* 카테고리 선택 뷰 */}
        <CategoryPickerView
          categories={currentCategories}
          selectedCategory={selectedCategory}
          onCategoryPress={onCategoryPress}
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
