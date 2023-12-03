import React from "react";
import { View, ScrollView, Text } from "react-native";
import { calendarStyle } from "../constants/constants";

// 날짜 리스트 선택할 수 있음
const Calendar = () => {
  return (
    <ScrollView
      style={{ paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={calendarStyle.container.text}>
        <Text style={calendarStyle.font}>9월 23일 (토)</Text>
      </View>
      <View style={calendarStyle.container.text}>
        <Text style={calendarStyle.font}>9월 24일 (일)</Text>
      </View>
      <View style={calendarStyle.container.text}>
        <Text style={calendarStyle.font}>9월 25일 (월)</Text>
      </View>
      <View style={calendarStyle.container.text}>
        <Text style={calendarStyle.font}>9월 26일 (화)</Text>
      </View>
      <View style={calendarStyle.container.text}>
        <Text style={calendarStyle.font}>9월 27일 (수)</Text>
      </View>
    </ScrollView>
  );
};

export default Calendar;
