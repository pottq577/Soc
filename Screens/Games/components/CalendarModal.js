import React from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { SCREEN_HEIGHT, calendarStyle } from "../constants/constants";

const CalendarModal = ({
  modalVisible,
  setModalVisible,
  selectedDate,
  setSelectedDate,
}) => {
  // 날짜 선택 핸들러
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    console.log(selectedDate);
    // 추가로 필요한 처리 작성
  };
  // 모달 외부를 터치했을 때 모달을 닫는 함수
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const CloseButton = () => (
    <TouchableOpacity style={calendarStyle.button} onPress={handleModalClose}>
      <Text>Close</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={calendarStyle.backdrop}
        activeOpacity={1}
        onPress={handleModalClose}
      >
        {/* 달력 컨테이너 */}
        <View
          style={calendarStyle.modalContainer}
          onStartShouldSetResponder={() => true}
        >
          <Calendar
            current="2017-06-01"
            minDate="2017-01-01"
            maxDate="2017-12-31"
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: "blue",
              },
            }}
          />
          {/* 닫기 버튼 */}
          <CloseButton />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CalendarModal;
