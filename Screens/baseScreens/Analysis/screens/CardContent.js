import React from "react";
import { View } from "react-native";
import NoContentView from "../components/NoContentView";
import CardView from "../components/CardView";
import { SEASONS, CATEGORIES } from "../constants/constants";
// 예시 데이터
import { playersData, teamData } from "../constants/data";

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
