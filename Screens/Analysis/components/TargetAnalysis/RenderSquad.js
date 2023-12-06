import React from "react";
import { View, Text } from "react-native";
import { analysisStyle, switchStyle } from "../../constants/constants";
import { squadData } from "../../constants/data";
import TeamSection from "../Tables/TeamSection";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useGames } from "../../../Games/hooks/useGames";
import Space from "../../../../components/Space";

/**
 * 스쿼드 렌더링 뷰 (TeamOverview.js, MatchLineUp.js에서 사용)
 * @param isHome 사용자에게 보여줄 스쿼드 정보가 홈인지 어웨이인지 구분
 *               '홈'일 경우 isHome === 0, '어웨이'일 경우 isHome === 1
 * @returns
 */
const RenderSquad = ({ isHome }) => {
  const { selectedTabIndex, setSelectedTabIndex } = useGames();
  return (
    <View style={analysisStyle.container}>
      <Text style={analysisStyle.header}>라인업</Text>
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
      <Space paddingVertical={10} />
      {/* title 값은 TeamSection.js에서 활용하고, title 수정 시 constants.js의 positionMapping 변수 매핑 가능 */}
      <TeamSection squad={squadData.attackers} title="공격수" />
      <TeamSection squad={squadData.midfielders} title="미드필더" />
      <TeamSection squad={squadData.defenders} title="수비수" />
      <TeamSection squad={squadData.goalkeepers} title="골키퍼" />
    </View>
  );
};

export default RenderSquad;
