import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IMAGES, seasonStyle } from "../constants/constants";

// 사용자가 선수(팀)의 분석할 시즌을 선택할 수 있는 Picker 컴포넌트
const SeasonPicker = ({
  selectedSeason,
  seasons,
  menuVisible,
  toggleMenu,
  setSelectedSeason,
}) => {
  return (
    <View style={seasonStyle.container}>
      <TouchableOpacity style={seasonStyle.button.menu} onPress={toggleMenu}>
        <Text>{selectedSeason}</Text>
        <Image style={seasonStyle.button.icon} source={IMAGES.DOWN_ARROW} />
      </TouchableOpacity>
      {menuVisible && (
        <View style={seasonStyle.modalView}>
          <Picker
            selectedValue={selectedSeason}
            onValueChange={(itemValue) => {
              setSelectedSeason(itemValue);
              toggleMenu();
            }}
          >
            {seasons.map((season, index) => (
              <Picker.Item key={index} label={season} value={season} />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

export default SeasonPicker;
