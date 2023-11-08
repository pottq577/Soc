import React from "react";
import { View, Text, Image } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { listStyle, switchStyle } from "../constants/constants";
import { useAnalysis } from "../hooks/useAnalysis";

const Target = ({ route }) => {
  const { item, isPlayer } = route.params;
  const {
    state: { isOverviewSelected },
    setIsOverviewSelected,
  } = useAnalysis(); // Custom Hook 사용

  const renderContentView = () => {
    if (isOverviewSelected) {
      return <Text>overview</Text>;
    } else {
      return <Text>analysis</Text>;
    }
  };

  return (
    <View>
      {/* 선수 정보 헤더 */}
      <View style={{ ...listStyle.card.container, marginHorizontal: 10 }}>
        <View style={listStyle.card.text.container}>
          <Text style={listStyle.card.text.name}>{item.name}</Text>
          {/* 선수 목록일 때만 팀 로고, 팀명 출력 */}
          {!isPlayer && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={listStyle.card.image.teamIcon} source={item.team} />
              <Text style={listStyle.card.text.teamName}>{item.teamName}</Text>
            </View>
          )}
          <Text style={listStyle.card.text.score}>{item.score}</Text>
        </View>
        <Image style={listStyle.card.image.photo} source={item.image} />
      </View>
      {/* 개요 / 분석 선택 탭 */}
      <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["개요", "분석"]}
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
    </View>
  );
};

export default Target;
