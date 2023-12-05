import React from "react";
import { View, Text, Image } from "react-native";
import Space from "../../../../components/Space";
import MatchHeaderGoals from "./MatchHeaderGoals";
import { matchListStyles } from "../../constants/constants";

// TODO DB에서 골 넣은 선수와 시간 데이터 가져올 수 있으면 가져오고, MatchHeaderGoals.js에 매개변수로 전달

// 팀명, 로고 출력 뷰
const TeamDisplay = ({ name, logo }) => {
  return (
    <View style={matchListStyles.matchHeader.teamContainer}>
      <Image style={matchListStyles.matchHeader.teamLogo} source={logo} />
      <Space padding={10} />
      <Text>{name}</Text>
    </View>
  );
};

const MatchHeader = ({
  team1_name,
  team1_goals,
  homeLogo,
  team2_name,
  team2_goals,
  awayLogo,
  datetime,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      {/* 경기 일정 표시 */}
      <Text>{datetime}</Text>
      {/* 팀, 득점 정보 표시 */}
      <View style={matchListStyles.matchHeader.container}>
        {/* 홈 팀 정보 */}
        <TeamDisplay name={team1_name} logo={homeLogo} />
        {/* 득점 수 */}
        <View style={matchListStyles.matchHeader.scoreContainer}>
          <Text>{team1_goals}</Text>
          <Text> : </Text>
          <Text>{team2_goals}</Text>
        </View>
        {/* 어웨이 팀 정보 */}
        <TeamDisplay name={team2_name} logo={awayLogo} />
      </View>
      {/* 골 타임라인 */}
      <MatchHeaderGoals />
    </View>
  );
};

export default MatchHeader;
