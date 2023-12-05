import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Cards from "../components/MatchCards/Cards";
import { useDateContext } from "../hooks/useDateContext";
import NoMatches from "../components/NoMatches";
import NotSelected from "../components/NotSelected";
import useFetchMatches from "../hooks/fetchMatches";
import getDateString from "../utils/getDateString";

const MatchCards = () => {
  const navigation = useNavigation();
  const matches = useFetchMatches();
  const { weekDates, selectedDate } = useDateContext();

  const handlePress = (match) => {
    navigation.navigate("MatchInfo", { ...match });
  };

  // 선택된 날짜가 없으면 전체 주차 경기를 보여주고, 있으면 해당 날짜의 경기만 필터링
  const filteredMatches = matches.filter((match) => {
    const matchDate = getDateString(match.datetime);
    return selectedDate
      ? matchDate === selectedDate
      : weekDates.includes(matchDate);
  });

  return (
    <ScrollView
      style={{ padding: 10, marginHorizontal: 10, marginBottom: 180 }}
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
