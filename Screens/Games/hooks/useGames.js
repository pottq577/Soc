import { useState } from "react";

export const useGames = (highlight) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // 현재 선택된 탭 인덱스
  const [highlightedDate, setHighlightedDate] = useState(highlight);
  const [imageData, setImageData] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);

  return {
    modalVisible,
    setModalVisible,
    selectedDate,
    setSelectedDate,
    selectedTabIndex,
    setSelectedTabIndex,
    highlightedDate,
    setHighlightedDate,
    imageData,
    setImageData,
    playerStats,
    setPlayerStats,
  };
};
