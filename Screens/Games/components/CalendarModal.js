import React from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { SCREEN_HEIGHT, calendarList } from "../constants/constants";

const CalendarModal = ({
  modalVisible,
  setModalVisible,
  selectedDate,
  setSelectedDate,
}) => {
  // 날짜 선택 핸들러
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    // 추가로 필요한 처리 작성
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={calendarList.modalContainer}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
          }}
        />
        <TouchableOpacity
          style={calendarList.button}
          onPress={() => setModalVisible(false)}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CalendarModal;
