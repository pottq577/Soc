import React from "react";
import { View, Text, Image } from "react-native";
import { analysisStyle, listStyle } from "../../constants/constants";
import Space from "../../../../components/Space";

const person = require("../../../../constants/icons/person.png");

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
        <FootText isPreferred={preferFoot === "left"} text="L" />
        <Space paddingHorizontal={5} />
        <FootText isPreferred={preferFoot === "right"} text="R" />
      </View>
    </View>
  );
};

// 분석 화면 진입 시 나오는 화면에 대한 렌더링, 선수 정보 간략 출력 헤더
const Header = ({
  item,
  isPlayer,
  isGame,
  team1_name,
  team1_goals,
  team2_name,
  team2_goals,
  datetime,
  homeLogo,
  awayLogo,
  teamType,
}) => {
  return (
    <View style={{ ...listStyle.card.container, marginHorizontal: 10 }}>
      <View style={listStyle.card.text.container}>
        {/* 선수명, 클럽명 */}
        <View style={{ flexDirection: "row" }}>
          {/* 게임 탭에서 넘어온 데이터 구분 */}
          {isGame ? (
            <Text style={listStyle.card.text.name}>{item.shortname}</Text>
          ) : (
            <Text style={listStyle.card.text.name}>{item.name}</Text>
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {teamType === "home" ? (
            <>
              <Image style={listStyle.card.image.teamIcon} source={homeLogo} />
              <Text style={listStyle.card.text.teamName}>{team1_name}</Text>
            </>
          ) : (
            <>
              <Image style={listStyle.card.image.teamIcon} source={awayLogo} />
              <Text style={listStyle.card.text.teamName}>{team2_name}</Text>
            </>
          )}
        </View>
        {/* 선수일 때만 출력 */}
        {isPlayer && (
          <View style={listStyle.card.foot_number.container}>
            <View style={analysisStyle.target.container}>
              <View style={analysisStyle.target.textContainer}>
                <Text style={analysisStyle.target.text}>국적</Text>
                <Text style={analysisStyle.target.text}>
                  {item.birtharea_name}
                </Text>
              </View>
              <View style={analysisStyle.target.textContainer}>
                <Text style={analysisStyle.target.text}>포지션</Text>
                <Text style={analysisStyle.target.text}>{item.role_code2}</Text>
              </View>
              <View style={analysisStyle.target.textContainer}>
                <Text style={analysisStyle.target.text}>키</Text>
                <Text style={analysisStyle.target.text}>{item.height}cm</Text>
              </View>
            </View>
            {/* items에서 선수의 주발 정보를 가져올 것. 선수일 때만 주발 정보 출력 */}
            <PreferFoot preferFoot={item.foot} />
          </View>
        )}
      </View>
      {isGame ? (
        <Image style={listStyle.card.image.photo} source={person} />
      ) : (
        <Image style={listStyle.card.image.photo} source={item.image} />
      )}
    </View>
  );
};

export default Header;
