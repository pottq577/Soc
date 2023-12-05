import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Cards from "../components/MatchCards/Cards";
import { useDateContext } from "../hooks/useDateContext";
import NoMatches from "../components/NoMatches";
import NotSelected from "../components/NotSelected";

const MatchCards = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);
  const { weekDates, selectedDate } = useDateContext();

  const fetchMatches = async () => {
    try {
      const response = await fetch("http://10.20.102.165:5002/matches");
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePress = (match) => {
    navigation.navigate("MatchInfo", { ...match });
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // 날짜만 추출하는 함수
  const getDateString = (datetime) => {
    return datetime.split("T")[0]; // 'YYYY-MM-DD' 형식으로 변환
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
