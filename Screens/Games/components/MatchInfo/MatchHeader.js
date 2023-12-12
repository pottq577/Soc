import React from "react";
import { View, Text, Image } from "react-native";
import Space from "../../../../components/Space";
import { matchListStyles, analysisStyle } from "../../constants/constants";
import MatchTimeLine from "./Overview/MatchTimeLine";
import Separator from "../../../../components/Separator";

// 팀명, 로고 출력 뷰
const TeamDisplay = ({ name, logo }) => {
  return (
    <View style={matchListStyles.matchHeader.teamContainer}>
      <Image style={matchListStyles.matchHeader.teamLogo} source={logo} />
      <Space padding={10} />
      <Text style={matchListStyles.matchHeader.teamText}>{name}</Text>
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
  matchEvents,
}) => {
  const formattedDate = datetime.split("T")[0].replace(/-/g, "-");

  return (
    <View style={{ alignItems: "center" }}>
      {/* 팀, 득점 정보 표시 */}
      <View style={matchListStyles.matchHeader.container}>
        {/* 홈 팀 정보 */}
        <TeamDisplay name={team1_name} logo={homeLogo} />
        {/* 득점 수 */}
        <View style={{ alignItems: "center" }}>
          <Text style={matchListStyles.matchHeader.teamText}>
            {formattedDate}
          </Text>
          <Space paddingVertical={20} />
          <View style={matchListStyles.matchHeader.scoreContainer}>
            <Text style={matchListStyles.matchHeader.scoreText}>
              {team1_goals}
            </Text>
            <Text style={matchListStyles.matchHeader.scoreText}> : </Text>
            <Text style={matchListStyles.matchHeader.scoreText}>
              {team2_goals}
            </Text>
          </View>
        </View>
        {/* 어웨이 팀 정보 */}
        <TeamDisplay name={team2_name} logo={awayLogo} />
      </View>
      <Separator />
      <View style={{ width: "90%" }}>
        {/* <Text style={analysisStyle.header}>타임라인</Text> */}
        {matchEvents.map((event, index) => (
          <MatchTimeLine
            key={index}
            event={event}
            team1Name={team1_name}
            team2Name={team2_name}
          />
        ))}
      </View>
    </View>
  );
};

export default MatchHeader;
