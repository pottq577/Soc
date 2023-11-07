import React from "react";
import { View } from "react-native";
import NoContentView from "./NoContentView";
import CardView from "./CardView";
import {
  SEASONS,
  CATEGORIES,
  playersData,
  teamData,
} from "../constants/constants";

const CardContent = ({ selectedSeason, isPlayerSelected }) => {
  const renderCardContent = () => {
    if (selectedSeason !== SEASONS[4]) return <NoContentView />;
    const categories = isPlayerSelected ? CATEGORIES.PLAYER : CATEGORIES.TEAMS;
    const data = isPlayerSelected ? playersData : teamData;

    return categories.map((category, index) => (
      <View key={index} style={{ marginBottom: 20 }}>
        <CardView
          category={category}
          data={data}
          isPlayer={!isPlayerSelected}
        />
      </View>
    ));
  };

  return renderCardContent();
};

export default CardContent;