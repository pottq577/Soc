import React from "react";
import { View } from "react-native";

const Space = ({ padding, paddingHorizontal, paddingVertical }) => {
  // 스타일 객체 생성
  const style = {};
  if (padding !== undefined) style.padding = padding;
  if (paddingHorizontal !== undefined)
    style.paddingHorizontal = paddingHorizontal;
  if (paddingVertical !== undefined) style.paddingVertical = paddingVertical;

  return <View style={style} />;
};

export default Space;
