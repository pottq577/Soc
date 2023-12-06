/**
 * CalendarModal.js에서 선택된 날짜를 기준으로 weekDates를 계산하고
 * setWeekDates를 사용하여 상태를 업데이트
 */
import React from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { calendarStyle } from "../../constants/constants";
import { getWeekDates } from "../../utils/getWeekDates";
import { useDateContext } from "../../hooks/useDateContext";

const CalendarModal = ({
  modalVisible,
  setModalVisible,
  selectedDate,
  setSelectedDate,
}) => {
  const { setWeekDates } = useDateContext();
  // 날짜 선택 핸들러
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    const weekDates = getWeekDates(day.dateString); // 해당 주의 날짜 범위 계산
    setWeekDates(weekDates);
    console.log("Selected Week Dates:", weekDates); // 확인을 위한 로그 출력
    setModalVisible(false);
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
            current="2017-08-11"
            minDate="2017-08-11"
            maxDate="2018-05-13"
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
