import React from "react";
import { View, Text, Image } from "react-native";
import Space from "../../../../components/Space";
import MatchHeaderGoals from "./MatchHeaderGoals";
import { matchListStyles } from "../../constants/constants";

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
  home,
  homeScore,
  homeLogo,
  away,
  awayScore,
  awayLogo,
}) => {
  return (
    <>
      {/* 팀, 득점 정보 표시 */}
      <View style={matchListStyles.matchHeader.container}>
        {/* 홈 팀 정보 */}
        <TeamDisplay name={home} logo={homeLogo} />
        {/* 득점 수 */}
        <View style={matchListStyles.matchHeader.scoreContainer}>
          <Text>{homeScore}</Text>
          <Text> : </Text>
          <Text>{awayScore}</Text>
        </View>
        {/* 어웨이 팀 정보 */}
        <TeamDisplay name={away} logo={awayLogo} />
      </View>
      {/* 골 타임라인 */}
      <MatchHeaderGoals />
    </>
  );
};

export default MatchHeader;
