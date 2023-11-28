import React from "react";
import { View } from "react-native";
import AnalysisPicker from "./AnalysisPicker";
import { analysisStyle, pickerType } from "../../constants/constants";

const AnalysisPickerContainer = ({
  picker,
  activePicker,
  togglePicker,
  items,
  selectedItem,
  setSelectedItem,
}) => {
  const isPickerActive = activePicker === picker;
  const marginTop =
    picker === pickerType.analysisType && activePicker === pickerType.player
      ? 200
      : 0;

  return (
    <View style={[analysisStyle.matchAnalysis.pickerContainer, { marginTop }]}>
      <AnalysisPicker
        items={items.map((item) => ({
          label: item.label || item,
          value: item.value || item,
        }))}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        toggleMenu={togglePicker}
        menuVisible={isPickerActive}
      />
    </View>
  );
};

export default AnalysisPickerContainer;
