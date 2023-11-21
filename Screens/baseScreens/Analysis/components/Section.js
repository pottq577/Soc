import React from "react";
import { View, Text } from "react-native";
import { analysisStyle } from "../constants/constants";
import InfoRow from "./InfoRow";

const Section = ({ sectionTitle, data }) => (
  <View style={analysisStyle.container}>
    <Text style={analysisStyle.header}>{sectionTitle}</Text>
    {Object.entries(data).map(([key, value]) => (
      // 개별 정보를 보여주는 컴포넌트 (InfoRow)
      <InfoRow key={key} label={key} value={value} />
    ))}
  </View>
);

export default Section;
