import React from "react";
import { ScrollView } from "react-native";
import { matches } from "../constants/data";
import { useNavigation } from "@react-navigation/native";
import Cards from "../components/MatchCards/Cards";

const MatchCards = () => {
  const navigation = useNavigation();
  const handlePress = (match) => {
    navigation.navigate("MatchInfo", { ...match });
  };

  return (
    <ScrollView style={{ padding: 10, marginHorizontal: 10 }}>
      {matches.map((match, index) => (
        <Cards key={index} match={match} onPress={() => handlePress(match)} />
      ))}
    </ScrollView>
  );
};

export default MatchCards;
