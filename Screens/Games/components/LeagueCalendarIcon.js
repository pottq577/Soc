import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { IMAGES, leagueCalIcon, styles } from "../constants/constants";

// 리그 아이콘과 달력 아이콘 출력
const LeagueCalendarIcon = () => {
  return (
    <View style={leagueCalIcon.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image source={IMAGES.PL_LOGO} style={styles.icons.PL_LOGO} />
      </View>
      <TouchableOpacity>
        <Image source={IMAGES.CALENDAR} style={styles.icons.CALENDAR} />
      </TouchableOpacity>
    </View>
  );
};

export default LeagueCalendarIcon;
