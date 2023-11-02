import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles, switchStyle } from "../Styles/analysisStyles";

const Separator = () => <View style={styles.separator} />;

export default function AnalysisScreen() {
  const [isPlayerSelected, setIsPlayerSelected] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={switchStyle.switchContainer}>
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

      <View style={styles.container}>
        <Text>seasons</Text>
      </View>

      <Separator />

      <View style={styles.container}>
        <Text>Cards</Text>
      </View>
    </ScrollView>
  );
}
