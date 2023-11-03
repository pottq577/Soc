import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import {
  styles,
  switchStyle,
  seasonStyle,
  cardStyle,
} from "../Styles/analysisStyles";

const Separator = () => <View style={styles.separator} />;

export default function AnalysisScreen() {
  const [isPlayerSelected, setIsPlayerSelected] = useState(true);

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("Select Season");

  const seasons = ["2023/24", "2022/23", "2021/22", "2020/21", "2019/20"];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const selectItem = (item) => {
    setSelectedSeason(item);
    setMenuVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 선수 / 팀 선택 뷰 */}
      <View style={switchStyle.container}>
        <TouchableOpacity
          style={[
            switchStyle.switchBtn,
            isPlayerSelected ? switchStyle.selected : switchStyle.unselected,
          ]}
          onPress={() => setIsPlayerSelected(true)}
          disabled={isPlayerSelected}
        >
          <Text>선수</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            switchStyle.switchBtn,
            !isPlayerSelected ? switchStyle.selected : switchStyle.unselected,
          ]}
          onPress={() => setIsPlayerSelected(false)}
          disabled={!isPlayerSelected}
        >
          <Text>팀</Text>
        </TouchableOpacity>
      </View>

      <Separator />

      {/* 시즌 선택 뷰 */}
      <View style={seasonStyle.container}>
        <TouchableOpacity style={seasonStyle.button} onPress={toggleMenu}>
          <Text>{selectedSeason}</Text>
        </TouchableOpacity>

        {menuVisible && (
          <FlatList
            data={seasons}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={seasonStyle.menuItem}
                onPress={() => selectItem(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Separator />

      <View style={cardStyle.container}>
        {selectedSeason !== "2019/20" ? (
          <Text>데이터를 불러올 수 없습니다</Text>
        ) : (
          <Text>Cards</Text>
        )}
      </View>
    </ScrollView>
  );
}
