import React from "react";
import { View, Image, Text } from "react-native";
import { IMAGES, calendarStyle } from "../constants/constants";
import Space from "../../../components/Space";

const NoMatches = () => (
  <View style={calendarStyle.select.container}>
    <Image source={IMAGES.NO_CONTENT} style={calendarStyle.select.icon} />
    <Space paddingVertical={10} />
    <Text style={calendarStyle.select.text}>
      해당 일(주)에는 경기 일정이 없습니다.
    </Text>
  </View>
);

export default NoMatches;
