import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IMAGES, seasonStyle } from "../constants/constants";

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
