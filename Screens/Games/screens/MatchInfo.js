import React from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import MatchHeader from "../components/MatchHeader";

const MatchInfo = () => {
  const route = useRoute(); // 현재 경로 정보를 가져옵니다
  const { home, homeScore, homeLogo, away, awayScore, awayLogo, datetime } =
    route.params;

  return (
    <MatchHeader
      home={home}
      homeScore={homeScore}
      homeLogo={homeLogo}
      away={away}
      awayScore={awayScore}
      awayLogo={awayLogo}
    />
  );
};

export default MatchInfo;
