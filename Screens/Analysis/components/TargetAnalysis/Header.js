import React from "react";
import { View, Text, Image } from "react-native";
import { analysisStyle, listStyle } from "../../constants/constants";
import Space from "../../../../components/Space";

const FootText = ({ isPreferred, text }) => {
  const textStyle = isPreferred
    ? { fontWeight: "bold", color: "blue" }
    : { color: "#rgba(167, 162, 163, 0.37)" };

  return (
    <View style={listStyle.card.foot_number.textContainer}>
      <Text style={[listStyle.card.foot_number.text, textStyle]}>{text}</Text>
    </View>
  );
};

const PreferFoot = ({ preferFoot }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ marginBottom: 7, fontWeight: "600" }}>선호 주발</Text>
      <View style={{ flexDirection: "row" }}>
        <FootText isPreferred={preferFoot === "L"} text="L" />
        <Space paddingHorizontal={5} />
        <FootText isPreferred={preferFoot === "R"} text="R" />
      </View>
    </View>
  );
};

// 분석 화면 진입 시 나오는 화면에 대한 렌더링, 선수 정보 간략 출력 헤더
const Header = ({ item, isPlayer }) => (
  <View style={{ ...listStyle.card.container, marginHorizontal: 10 }}>
    <View style={listStyle.card.text.container}>
      {/* 선수명, 클럽명 */}
      <View style={{ flexDirection: "row" }}>
        <Text style={listStyle.card.text.name}>{item.name}</Text>
        <Space paddingHorizontal={5} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={listStyle.card.image.teamIcon} source={item.team} />
          <Text style={listStyle.card.text.teamName}>{item.teamName}</Text>
        </View>
      </View>
      {/* 선수일 때만 클럽 아이콘, 클럽명 출력 */}
      {isPlayer && (
        <View>
          <View style={listStyle.card.foot_number.container}>
            <View style={analysisStyle.target.container}>
              <View style={analysisStyle.target.textContainer}>
                <Text style={analysisStyle.target.text}>국적</Text>
                <Text style={analysisStyle.target.text}>대한민국</Text>
              </View>
              <View style={analysisStyle.target.textContainer}>
                <Text style={analysisStyle.target.text}>포지션</Text>
                <Text style={analysisStyle.target.text}>공격수</Text>
              </View>
              <View style={analysisStyle.target.textContainer}>
                <Text style={analysisStyle.target.text}>키</Text>
                <Text style={analysisStyle.target.text}>180cm</Text>
              </View>
            </View>
            {/* items에서 선수의 주발 정보를 가져올 것. 선수일 때만 주발 정보 출력 */}
            <PreferFoot preferFoot={"R"} />
          </View>
        </View>
      )}
    </View>
    <Image style={listStyle.card.image.photo} source={item.image} />
  </View>
);

export default Header;
