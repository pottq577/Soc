import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Cards from "../components/MatchCards/Cards";
import { useDateContext } from "../hooks/useDateContext";
import NoMatches from "../components/NoMatches";
import NotSelected from "../components/NotSelected";
import useFetchMatches from "../hooks/fetchMatches";
import getDateString from "../utils/getDateString";
import { getWeekDates } from "../utils/getWeekDates";
import { TEAMS } from "../../Analysis/constants/constants";

// TODO 경기 일정 / 날짜 카드 수정 필요
const MatchCards = () => {
  const navigation = useNavigation();
  const matches = useFetchMatches();
  const { weekDates, setWeekDates, selectedDate, setSelectedDate } =
    useDateContext();
  const mapTeamLogo = (teamName) => {
    const logoPath = TEAMS[teamName.replace(/\s/g, "")]; // 공백을 제거
    // console.log(`Logo path for ${teamName}:`, logoPath); // 콘솔 로깅
    return logoPath;
  };
  useEffect(() => {
    // 컴포넌트 마운트 시, 1주차 경기 일정을 설정
    if (matches.length > 0 && weekDates.length === 0) {
      const firstMatchDate = getDateString(matches[0].datetime);
      setWeekDates(getWeekDates(firstMatchDate));
      setSelectedDate(null);
    }
  }, [matches, weekDates, setWeekDates, setSelectedDate]);

  const handlePress = (match) => {
    navigation.navigate("MatchInfo", { ...match });
    console.log(match);
  };

  // 선택된 날짜가 없으면 전체 주차 경기를 보여주고, 있으면 해당 날짜의 경기만 필터링
  const filteredMatches = matches
    .filter((match) => {
      const matchDate = getDateString(match.datetime);
      return selectedDate
        ? matchDate === selectedDate
        : weekDates.includes(matchDate);
    })
    .map((match) => ({
      ...match,
      homeLogo: mapTeamLogo(match.team1_name),
      awayLogo: mapTeamLogo(match.team2_name),
    }));

  return (
    <ScrollView
      style={{ padding: 10, marginHorizontal: 10, marginBottom: 200 }}
    >
      {weekDates.length === 0 ? (
        <NotSelected />
      ) : filteredMatches.length === 0 ? (
        <NoMatches />
      ) : (
        filteredMatches.map((match, index) => (
          <Cards key={index} match={match} onPress={() => handlePress(match)} />
        ))
      )}
    </ScrollView>
  );
};

export default MatchCards;
