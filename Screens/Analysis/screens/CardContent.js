// branch test
import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import NoContentView from "../components/NoContentView";
import CardView from "../components/CardView";
import { SEASONS, CATEGORIES } from "../constants/constants";
// 예시 데이터
import { playersData, teamData } from "../constants/data";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/config";
/**
 * '분석' 탭 진입 시 보여줄 카드 렌더링
 * @param selectedSeason: 사용자가 선택한 시즌에 따라 출력되는 정보를 다르게 함
 * @param isPlayerSelected: 해당 파라미터의 상태에 따라 선수 / 팀 카드를 보여줌
 * @param category: isPlayerSelected 상태에 따라 선수 / 팀 카테고리를 선택함
 * @param data: isPlayerSelected 상태에 따라 선수 / 팀 데이터를 선택함
 * @returns CardView.js
 */
const CardContent = ({ selectedSeason, isPlayerSelected }) => {
  if (selectedSeason !== SEASONS[6]) return <NoContentView />;
  const categories = isPlayerSelected ? CATEGORIES.PLAYER : CATEGORIES.TEAMS;
  const data = isPlayerSelected ? playersData : teamData;

  const [teamData, setTeamData] = useState([]);
  const [topWins, setTopWins] = useState([]);
  const [topLosses, setTopLosses] = useState([]);
  const [topGoalDifference, setTopGoalDifference] = useState([]);
  const [topGoalsFor, setTopGoalsFor] = useState([]);
  const [topGoalsAgainst, setTopGoalsAgainst] = useState([]);
  const fetchCategoryData = async (category, setState) => {
    try {
      const response = await fetch(
        `${POSTGRES_SERVER_ADDRESS}/top-teams/${category}`
      );
      const data = await response.json();
      const sortedData = Object.entries(data)
        .map(([team, value]) => ({ team, value }))
        .sort((a, b) => b.value - a.value); // 내림차순으로 정렬
      setState(sortedData);
    } catch (error) {
      Alert.alert("Error", `Failed to load data for ${category}`);
    }
  };

  useEffect(() => {
    if (selectedSeason === SEASONS[6]) {
      fetchCategoryData("wins", setTopWins);
      fetchCategoryData("losses", setTopLosses);
      fetchCategoryData("goal-difference", setTopGoalDifference);
      fetchCategoryData("goals-for", setTopGoalsFor);
      fetchCategoryData("goals-against", setTopGoalsAgainst);
    }
  }, [selectedSeason]);

  return categories.map((category, index) => (
    <View key={index} style={{ marginBottom: 20 }}>
      <CardView category={category} data={data} isPlayer={isPlayerSelected} />
    </View>
  ));
};

export default CardContent;
