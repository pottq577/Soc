import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { seasonStyle, IMAGES } from "../constants/constants";
import { Picker } from "@react-native-picker/picker";

// 선수나 분석 종류 선택 Picker 컴포넌트
const AnalysisPicker = ({
  items,
  selectedItem,
  setSelectedItem,
  toggleMenu,
  menuVisible,
}) => {
  return (
    <View style={seasonStyle.container}>
      <TouchableOpacity style={seasonStyle.button.menu} onPress={toggleMenu}>
        <Text>{selectedItem}</Text>
        <Image style={seasonStyle.button.icon} source={IMAGES.DOWN_ARROW} />
      </TouchableOpacity>
      {menuVisible && (
        <View style={seasonStyle.modalView}>
          <Picker
            selectedValue={selectedItem}
            onValueChange={(itemValue) => {
              setSelectedItem(itemValue);
            }}
          >
            {items.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

export default AnalysisPicker;
