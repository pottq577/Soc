import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { analysisStyle, switchStyle } from "../../../constants/constants";
// import { squadData } from "../../constants/data";
import TeamSection from "./TeamSection";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useGames } from "../../../hooks/useGames";

import Space from "../../../../../components/Space";

/**
 * 스쿼드 렌더링 뷰
 * @param isHome 사용자에게 보여줄 스쿼드 정보가 홈인지 어웨이인지 구분
 *               '홈'일 경우 isHome === 0, '어웨이'일 경우 isHome === 1
 * @returns
 */
const RenderSquad = ({ match_id, homeLineup, awayLineup }) => {
  const { selectedTabIndex, setSelectedTabIndex } = useGames();
  console.log("Away Lineup in RenderSquad:", awayLineup); // 어웨이 팀 라인업 로깅

  const categorizePlayersByPosition = (players) => {
    // 빈 배열이거나 배열이 아닌 경우 빈 카테고리 객체를 반환
    if (!Array.isArray(players) || players.length === 0) {
      return {
        Forwards: [],
        Midfielders: [],
        Defenders: [],
        Goalkeepers: [],
      };
    }

    const categorized = {
      Forwards: [],
      Midfielders: [],
      Defenders: [],
      Goalkeepers: [],
    };

    players.forEach((player) => {
      switch (player.role_code2) {
        case "FW":
          categorized.Forwards.push(player);
          break;
        case "MD":
          categorized.Midfielders.push(player);
          break;
        case "DF":
          categorized.Defenders.push(player);
          break;
        case "GK":
          categorized.Goalkeepers.push(player);
          break;
        default:
          break;
      }
    });

    return categorized;
  };

  // 현재 선택된 탭에 따른 라인업 데이터
  const currentLineup = selectedTabIndex === 0 ? homeLineup : awayLineup;
  const squad = categorizePlayersByPosition(currentLineup);

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
      {/* <TeamSection squad={squad.Forwards} title="공격수" />
      <TeamSection squad={squad.Midfielders} title="미드필더" />
      <TeamSection squad={squad.Defenders} title="수비수" />
      <TeamSection squad={squad.Goalkeepers} title="골키퍼" /> */}
    </View>
  );
};

export default RenderSquad;
