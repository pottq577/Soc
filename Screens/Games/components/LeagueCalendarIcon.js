import React from "react";
import { View, Image, TouchableOpacity, Modal, Text } from "react-native";
import { IMAGES, leagueCalIcon, styles } from "../constants/constants";
import { useModal } from "../hooks/useModal";
import CalendarModal from "./CalendarModal";

const DisplayIcon = ({ selectedTabIndex, setModalVisible }) => (
  <View style={leagueCalIcon.container}>
    {/* 왼쪽 공간 */}
    <View style={{ flex: 1 }} />

    {/* 중앙에 PL_LOGO 아이콘 배치 */}
    <View style={leagueCalIcon.PL_container}>
      <Image source={IMAGES.PL_LOGO} style={styles.icons.PL_LOGO} />
    </View>

    {/* 우측에 CALENDAR 아이콘 배치 (조건부 렌더링: 경기 일정일 때만) */}
    <TouchableOpacity
      style={leagueCalIcon.CALENDAR_container}
      onPress={() => setModalVisible(true)}
    >
      {selectedTabIndex === 0 && (
        <Image source={IMAGES.CALENDAR} style={styles.icons.CALENDAR} />
      )}
    </TouchableOpacity>
  </View>
);

// 리그 아이콘과 달력 아이콘 출력
const LeagueCalendarIcon = ({ selectedTabIndex }) => {
  const { modalVisible, setModalVisible, selectedDate, setSelectedDate } =
    useModal();

  return (
    <View>
      {/* 아이콘 뷰 */}
      <DisplayIcon
        selectedTabIndex={selectedTabIndex}
        setModalVisible={setModalVisible}
      />

      {/* 달력 모달 */}
      <CalendarModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
};

export default LeagueCalendarIcon;
