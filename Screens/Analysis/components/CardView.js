import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import FullListViewButton from "./FullListViewButton";
import { cardStyle } from "../constants/constants";
import Separator from "../../../components/Separator";
import { useNavigation } from "@react-navigation/native";

// 선수 뷰일 때만 팀명/로고 출력 (renderFirst)
const TeamInfo = ({ playerData }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Image style={cardStyle.card.image.teamIcon} source={playerData.team} />
    <Text style={cardStyle.card.text.teamName}>{playerData.teamName}</Text>
  </View>
);

/**
 * 선수 / 팀에 대한 데이터 렌더링
 * @param {*} param0
 * @returns
 */
const CardView = ({ category, data, isPlayer }) => {
  const navigation = useNavigation();
  /**
   * 사용자가 특정 선수 / 팀 선택 시 파라미터와 함께 Target.js(선수 / 팀 분석 화면)으로 네비게이션
   * @param item: 선수 / 팀의 데이터
   */
  const handlePress = (item) => {
    navigation.navigate("Target", { category, isPlayer, data, item });
  };

  // 각 카테고리 별 1등인 선수 / 팀에 대한 정보 출력 (카드 형식)
  const renderFirst = (playerData, index) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(playerData)}
        style={cardStyle.card.first}
      >
        {/* 카드 좌측 선수 / 팀 텍스트 데이터 */}
        <View style={{ justifyContent: "space-around", width: 200 }}>
          <Text style={cardStyle.card.text.rank}>{playerData.rank}</Text>
          <Text style={cardStyle.card.text.name}>{playerData.name}</Text>
          {/* 선수 뷰일 때만 팀명/로고 출력 */}
          {isPlayer && <TeamInfo playerData={playerData} />}
          <Text style={cardStyle.card.text.score}>{playerData.score}</Text>
        </View>
        {/* 카드 우측 선수 / 팀 이미지(아이콘) */}
        <Image style={cardStyle.card.image.photo} source={playerData.image} />
      </TouchableOpacity>
    );
  };

  // 각 카테고리 별 1등인 선수 / 팀을 제외한 나머지 목록 출력 (리스트 형식)
  const renderOthers = (playerData, index) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(playerData)}
        style={cardStyle.card.others}
      >
        {/* 리스트 좌측 선수 / 팀 데이터 */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={cardStyle.card.image.teamIcon}
            source={playerData.image}
          />
          <Text>{playerData.name}</Text>
        </View>
        {/* 리스트 우측 선수 / 팀 */}
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
          <React.Fragment key={index}>
            {renderOthers(player, index)}
            {index === 0 && <Separator />}
          </React.Fragment>
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
