import React from "react";
import { View, Text, FlatList } from "react-native";

const Target = ({ route }) => {
  const { item, isPlayer, data } = route.params;

  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default Target;
