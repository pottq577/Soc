import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { analysisStyle } from "../../constants/constants";

// 월 별로 선택할 수 있는 탭
const MatchMonthTabs = ({ months, selectedMonth, onSelectMonth }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={analysisStyle.matchList.tab.container}
  >
    {months.map((month) => (
      <TouchableOpacity
        key={month}
        onPress={() => onSelectMonth(month)}
        style={analysisStyle.matchList.tab.button}
      >
        <Text
          style={selectedMonth === month ? { fontWeight: "bold" } : {}}
        >{`${month}월`}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default MatchMonthTabs;
