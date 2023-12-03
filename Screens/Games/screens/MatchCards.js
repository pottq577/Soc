import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { IMAGES, calendarStyle } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";
import Cards from "../components/MatchCards/Cards";
import { useDateContext } from "../hooks/useDateContext";
import { matches } from "../constants/data";
import NoMatches from "../components/NoMatches";
import NotSelected from "../components/NotSelected";

const MatchCards = () => {
  const navigation = useNavigation();
  const handlePress = (match) => {
    navigation.navigate("MatchInfo", { ...match });
  };
  const { weekDates, selectedDate } = useDateContext();

  // 선택된 날짜가 없으면 전체 주차 경기를 보여주고, 있으면 해당 날짜의 경기만 필터링
  const filteredMatches = selectedDate
    ? matches.filter((match) => match.datetime.startsWith(selectedDate))
    : matches.filter((match) =>
        weekDates.some((date) => match.datetime.startsWith(date))
      );

  return (
    <ScrollView style={{ padding: 10, marginHorizontal: 10 }}>
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
