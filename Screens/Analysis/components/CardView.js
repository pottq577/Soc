import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import FullListViewButton from "./FullListViewButton";
import { cardStyle } from "../constants/constants";
import Separator from "../../../components/Separator";
import { useNavigation } from "@react-navigation/native";
import { TEAMS } from "../constants/constants";
import Space from "../../../components/Space";

const PERSON = require("../../../constants/icons/person.png");
const first = {
  120353: require("../../../constants/players/salah.png"),
  38021: require("../../../constants/players/kdb.png"),
  70086: require("../../../constants/players/otamendi.png"),
  8726: require("../../../constants/players/begovic.png"),
  "Oriol Romeu": require("../../../constants/players/romeu.png"),
};

// 선수 뷰일 때만 팀명/로고 출력 (renderFirst)
const TeamInfo = ({ playerData }) => {
  const teamKey = playerData.team.replace(/\s+/g, "");
  // console.log(teamKey);
  const teamImage = TEAMS[teamKey];
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {teamImage && (
        <Image style={cardStyle.card.image.teamIcon} source={teamImage} />
      )}
      <Text style={cardStyle.card.text.teamName}>{playerData.team}</Text>
    </View>
  );
};

/**
 * 선수 / 팀에 대한 데이터 렌더링
 * @param {*} param0
 * @returns
 */
const CardView = ({ category, data, isPlayer }) => {
  // console.log("team: ", data[0].team);
  const isValidData = data && data.length > 0 && data[0].hasOwnProperty("rank");
  const navigation = useNavigation();
  const getCategoryText = (category) => {
    switch (category) {
      case "득점왕":
        return "골";
      case "어시스트왕":
        return "어시스트";
      case "패스마스터":
        return "패스 성공";
      case "열심히 하시잖아":
        return "출전 시간(min)";
      case "치즈왕":
        return "경고";
      default:
        return "";
    }
  };

  /**
   * 사용자가 특정 선수 / 팀 선택 시 파라미터와 함께 Target.js(선수 / 팀 분석 화면)으로 네비게이션
   * @param item: 선수 / 팀의 데이터
   */
  const handlePress = (item) => {
    navigation.navigate("Target", { category, isPlayer, data, item });
  };

  // 각 카테고리 별 1등인 선수 / 팀에 대한 정보 출력 (카드 형식)
  const renderFirst = (playerData, index, category) => {
    if (!isValidData) return null; // 데이터가 유효하지 않으면 null 반환
    const playerImage = first[playerData.player_id] || first[playerData.name];
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
        {isPlayer ? (
          // <Image style={cardStyle.card.image.photo} source={PERSON} />
          playerImage && (
            <Image style={cardStyle.card.image.photo} source={playerImage} />
          )
        ) : (
          <Image style={cardStyle.card.image.photo} source={playerData.image} />
        )}
      </TouchableOpacity>
    );
  };

  // 각 카테고리 별 1등인 선수 / 팀을 제외한 나머지 목록 출력 (리스트 형식)
  const renderOthers = (playerData, index, category) => {
    if (!isValidData) return null; // 데이터가 유효하지 않으면 null 반환
    const categoryText = getCategoryText(category); // 카테고리 텍스트

    return (
      <TouchableOpacity
        onPress={() => handlePress(playerData)}
        style={cardStyle.card.others}
      >
        {/* 리스트 좌측 선수 / 팀 데이터 */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isPlayer ? (
            <Image style={cardStyle.card.image.teamIcon} source={PERSON} />
          ) : (
            <Image
              style={cardStyle.card.image.teamIcon}
              source={playerData.image}
            />
          )}
          <Text>{playerData.name}</Text>
        </View>
        {/* 리스트 우측 선수 / 팀 */}
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "600" }}>{playerData.score}</Text>
          <Space paddingHorizontal={3} />
          <Text>{categoryText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.card.text.head}>{category}</Text>
      <View style={cardStyle.card.container}>
        {/* 1st */}
        {renderFirst(data[0], category)}
        {/* 2nd, 3rd */}
        {data.slice(1, 3).map((player, index) => (
          <React.Fragment key={index}>
            {renderOthers(player, index, category)}
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
