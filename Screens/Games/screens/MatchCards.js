import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { IMAGES, calendarStyle } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";
import Cards from "../components/MatchCards/Cards";
import { useDateContext } from "../hooks/useDateContext";
import { matches } from "../constants/data";
import Space from "../../../components/Space";

const NotSelected = () => {
  return (
    <View style={calendarStyle.select.container}>
      <Image
        source={IMAGES.SELECT_CALENDAR}
        style={calendarStyle.select.icon}
      />
      <Text style={calendarStyle.select.text}>우측 상단의 달력을 통해</Text>
      <Text style={calendarStyle.select.text}>날짜를 선택해주세요.</Text>
    </View>
  );
};

const NoMatches = () => (
  <View style={calendarStyle.select.container}>
    <Image source={IMAGES.NO_CONTENT} style={calendarStyle.select.icon} />
    <Space paddingVertical={10} />
    <Text style={calendarStyle.select.text}>
      해당 주에는 경기 일정이 없습니다.
    </Text>
  </View>
);

const MatchCards = () => {
  const navigation = useNavigation();
  const handlePress = (match) => {
    navigation.navigate("MatchInfo", { ...match });
  };
  const { weekDates } = useDateContext();

  // weekDates와 일치하는 actualData 필터링
  const filteredMatches =
    weekDates.length > 0
      ? matches.filter((match) =>
          weekDates.some((date) => match.datetime.startsWith(date))
        )
      : [];

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
