import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { POSTGRES_SERVER_ADDRESS } from "../../../../../constants/config";
import { analysisStyle } from "../../../constants/constants";

const BallTouch = () => {
  return (
    <View style={{ padding: 10 }}>
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>볼 터치 위치</Text>
      </View>
    </View>
  );
};

export default BallTouch;
