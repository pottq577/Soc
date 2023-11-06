import React from "react";
import { View } from "react-native";
import NoContentView from "./NoContentView";
import CardView from "./CardView";

// 예시 데이터
const playersData = [
  {
    rank: 1,
    name: "Alexis Sanchez",
    score: 77,
    image: require("../../../constants/77.jpeg"),
    team: require("../../../constants/arsenal.png"),
    teamName: "Arsenal",
  },
  {
    rank: 2,
    name: "Alexis Sanchez",
    score: 77,
    image: require("../../../constants/77.jpeg"),
    team: require("../../../constants/arsenal.png"),
    teamName: "Arsenal",
  },
];
const teamData = [
  {
    rank: 1,
    name: "Arsenal",
    score: 44,
    image: require("../../../constants/arsenal.png"),
  },
  {
    rank: 2,
    name: "Arsenal",
    score: 44,
    image: require("../../../constants/arsenal.png"),
  },
];

const CardContent = ({ selectedSeason, isPlayerSelected }) => {
  const renderCardContent = () => {
    if (selectedSeason !== "2019/20") return <NoContentView />;
    const categories = isPlayerSelected
      ? ["Goals", "Assist", "Pass", "Shoot"]
      : ["Wins", "Losses"];
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
