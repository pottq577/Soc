import React from "react";
import { View, Image, Text } from "react-native";
import { analysisStyle } from "../constants/constants";
import { positionColors } from "../constants/constants";

const InfoRow = ({ label, value }) => {
  const textStyle =
    label === "Position" ? { color: positionColors[value.label] } : {};
  // value가 객체이면 이미지와 레이블을 모두 표시합니다.
  const content =
    typeof value === "object" ? (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {value.image && (
          <Image
            source={value.image}
            style={{ width: 30, height: 15, marginRight: 10 }}
          />
        )}
        <Text style={[analysisStyle.content.subject.detail, textStyle]}>
          {value.label}
        </Text>
      </View>
    ) : (
      <Text style={[analysisStyle.content.subject.detail, textStyle]}>
        {value}
      </Text>
    );
  return (
    <View style={analysisStyle.content.container}>
      <Text style={analysisStyle.content.subject.title}>{label}</Text>
      {content}
    </View>
  );
};

export default InfoRow;
