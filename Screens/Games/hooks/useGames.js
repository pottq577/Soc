import { useState } from "react";

export const useGames = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // 현재 선택된 탭 인덱스

  return {
    modalVisible,
    setModalVisible,
    selectedDate,
    setSelectedDate,
    selectedTabIndex,
    setSelectedTabIndex,
  };
};
