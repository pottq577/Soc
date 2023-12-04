// useDateContext를 사용하여 weekDates를 가져오고, 이를 화면에 표시
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { calendarStyle } from "../../constants/constants";
import { useDateContext } from "../../hooks/useDateContext";

const Date = () => {
  const { weekDates, selectedDate, setSelectedDate } = useDateContext();
  const [highlightedDate, setHighlightedDate] = useState(selectedDate);

  const handleSelectDate = (date) => {
    setSelectedDate(date); // 선택한 날짜 상태 업데이트
    setHighlightedDate(date);
  };

  return (
    <ScrollView
      style={{ paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {weekDates.map((date, index) => (
        <TouchableOpacity
          key={index}
          style={[
            calendarStyle.container.text,
            highlightedDate === date && calendarStyle.selectedDateStyle, // 선택된 날짜에 대한 스타일
          ]}
          onPress={() => handleSelectDate(date)}
        >
          <Text
            style={[
              calendarStyle.font,
              highlightedDate === date && calendarStyle.selectedFontStyle, // 선택된 날짜에 대한 Text 스타일
            ]}
          >
            {date}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Date;
