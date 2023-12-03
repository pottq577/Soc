// useDateContext를 사용하여 weekDates를 가져오고, 이를 화면에 표시
import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { calendarStyle } from "../../constants/constants";
import { useDateContext } from "../../hooks/useDateContext";

const Date = () => {
  const { weekDates } = useDateContext();

  return (
    <ScrollView
      style={{ paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {weekDates.map((date, index) => (
        <TouchableOpacity key={index} style={calendarStyle.container.text}>
          <Text style={calendarStyle.font}>{date}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Date;
