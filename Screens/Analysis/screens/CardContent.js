import React from "react";
import { View } from "react-native";
import NoContentView from "../components/NoContentView";
import CardView from "../components/CardView";
import { SEASONS, CATEGORIES } from "../constants/constants";
// 예시 데이터
import { playersData, teamData } from "../constants/data";

/**
 * '분석' 탭 진입 시 보여줄 카드 렌더링
 * @param selectedSeason: 사용자가 선택한 시즌에 따라 출력되는 정보를 다르게 함
 * @param isPlayerSelected: 해당 파라미터의 상태에 따라 선수 / 팀 카드를 보여줌
 * @param category: isPlayerSelected 상태에 따라 선수 / 팀 카테고리를 선택함
 * @param data: isPlayerSelected 상태에 따라 선수 / 팀 데이터를 선택함
 * @returns CardView.js
 */
const CardContent = ({ selectedSeason, isPlayerSelected }) => {
  if (selectedSeason !== SEASONS[4]) return <NoContentView />;
  const categories = isPlayerSelected ? CATEGORIES.PLAYER : CATEGORIES.TEAMS;
  const data = isPlayerSelected ? playersData : teamData;

  return categories.map((category, index) => (
    <View key={index} style={{ marginBottom: 20 }}>
      <CardView category={category} data={data} isPlayer={!isPlayerSelected} />
    </View>
  ));
};

export default CardContent;
