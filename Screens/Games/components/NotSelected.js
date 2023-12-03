import React from "react";
import { View, Image, Text } from "react-native";
import { IMAGES, calendarStyle } from "../constants/constants";

const NotSelected = () => (
  <View style={calendarStyle.select.container}>
    <Image source={IMAGES.SELECT_CALENDAR} style={calendarStyle.select.icon} />
    <Text style={calendarStyle.select.text}>우측 상단의 달력을 통해</Text>
    <Text style={calendarStyle.select.text}>날짜를 먼저 선택해주세요.</Text>
  </View>
);

export default NotSelected;
