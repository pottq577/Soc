import React, { useRef } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import SeasonPickerView from "./screens/SeasonPickerView";
import CardContent from "./screens/CardContent";
import { useAnalysis } from "./hooks/useAnalysis";
import {
  Separator,
  styles,
  switchStyle,
  categoryStyle,
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={categoryStyle.container}
        >
          <View style={categoryStyle.category.container}>
            {currentCategories.map((category, index) => (
              <TouchableOpacity
                onPress={() => onCategoryPress(category)}
                key={index}
                style={[
                  categoryStyle.category.content,
                  selectedCategory === category &&
                    categoryStyle.category.selected.content,
                ]}
              >
                <Text
                  style={[
                    categoryStyle.category.text,
                    selectedCategory === category &&
                      categoryStyle.category.selected.text,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
