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

  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.card.text.head}>{category}</Text>
      <View style={cardStyle.card.container}>
        {/* 1st */}
        <TouchableOpacity
          onPress={() => {
            handlePress(data[0]);
          }}
          style={cardStyle.card.first}
        >
          <View style={{ justifyContent: "space-around" }}>
            <Text>{data[0].rank}</Text>
            <Text style={cardStyle.card.text.name}>{data[0].name}</Text>
            {/* 선수 뷰일 때만 팀명/로고 출력 */}
            {!isPlayer && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={cardStyle.card.image.teamIcon}
                  source={data[0].team}
                />
                <Text style={cardStyle.card.text.teamName}>
                  {data[0].teamName}
                </Text>
              </View>
            )}
            <Text style={cardStyle.card.text.score}>{data[0].score}</Text>
          </View>
          <Image style={cardStyle.card.image.photo} source={data[0].image} />
        </TouchableOpacity>

        {/* 2nd, 3rd */}
        <View>
          <TouchableOpacity
            onPress={() => {
              handlePress(data[1]);
            }}
            style={cardStyle.card.others}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={cardStyle.card.image.teamIcon}
                source={data[1].team}
              />
              <Text>{data[1].name}</Text>
            </View>
            <Text>{data[1].score}</Text>
          </TouchableOpacity>

          <Separator />

          <TouchableOpacity
            onPress={() => {
              handlePress(data[2]);
            }}
            style={cardStyle.card.others}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={cardStyle.card.image.teamIcon}
                source={data[2].team}
              />
              <Text>{data[2].name}</Text>
            </View>
            <Text>{data[2].score}</Text>
          </TouchableOpacity>

          {/* 전체 목록 보기 버튼 */}
          <FullListViewButton
            category={category}
            data={data}
            isPlayer={isPlayer}
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
};

export default CardView;
