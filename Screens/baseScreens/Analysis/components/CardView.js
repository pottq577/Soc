import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import FullListViewButton from "./FullListViewButton";
import { Separator, cardStyle } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";

const CardView = ({ category, data, isPlayer }) => {
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate("Target", { category, isPlayer, data, item });
  };

  const renderFirst = (playerData, index) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(playerData)}
        style={cardStyle.card.first}
      >
        <View style={{ justifyContent: "space-around" }}>
          <Text style={cardStyle.card.text.rank}>{playerData.rank}</Text>
          <Text style={cardStyle.card.text.name}>{playerData.name}</Text>
          {/* 선수 뷰일 때만 팀명/로고 출력 */}
          {!isPlayer && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={cardStyle.card.image.teamIcon}
                source={playerData.team}
              />
              <Text style={cardStyle.card.text.teamName}>
                {playerData.teamName}
              </Text>
            </View>
          )}
          <Text style={cardStyle.card.text.score}>{playerData.score}</Text>
        </View>
        <Image style={cardStyle.card.image.photo} source={playerData.image} />
      </TouchableOpacity>
    );
  };

  const renderOthers = (playerData, index) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(playerData)}
        style={cardStyle.card.others}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={cardStyle.card.image.teamIcon}
            source={playerData.team}
          />
          <Text>{playerData.name}</Text>
        </View>
        <Text>{playerData.score}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.card.text.head}>{category}</Text>
      <View style={cardStyle.card.container}>
        {/* 1st */}
        {renderFirst(data[0])}
        {/* 2nd, 3rd */}
        {data.slice(1, 3).map((player, index) => (
          <>
            {renderOthers(player, index)}
            {index === 0 && <Separator />}
          </>
        ))}
        {/* 전체 목록 보기 버튼 */}
        <FullListViewButton
          category={category}
          data={data}
          isPlayer={isPlayer}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default CardView;
