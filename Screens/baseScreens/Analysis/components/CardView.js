import React from "react";
import { View, Text, Image } from "react-native";
import FullListViewButton from "./FullListViewButton";
import { Separator, cardStyle } from "../constants/constants";

const CardView = ({ category, data, isPlayer }) => {
  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.card.text.head}>{category}</Text>
      <View style={cardStyle.card.container}>
        {/* 1st */}
        <View style={cardStyle.card.first}>
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
        </View>

        {/* 2nd, 3rd */}
        <View>
          <View style={{ padding: 10, flexDirection: "row" }}>
            <Text>2nd</Text>
            <Text>2nd name</Text>
          </View>

          <Separator />

          <View style={{ padding: 10, flexDirection: "row" }}>
            <Text>3nd</Text>
            <Text>3nd name</Text>
          </View>

          {/* 전체 목록 보기 버튼 */}
          <FullListViewButton
            category={category}
            data={data}
            isPlayer={isPlayer}
          />
        </View>
      </View>
    </View>
  );
};

export default CardView;
