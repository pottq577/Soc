import React from "react";
import { View, Image, Text } from "react-native";
import Space from "../../../../components/Space";
import { matchListStyles, styles } from "../../constants/constants";

const TeamInfo = ({ name, logo, alignRight }) => {
  return (
    <View
      style={[
        matchListStyles.teamInfo,
        alignRight
          ? { justifyContent: "flex-end" }
          : { justifyContent: "flex-start" },
      ]}
    >
      {alignRight && (
        <Text style={[matchListStyles.text, matchListStyles.teamName]}>
          {name}
        </Text>
      )}
      <Space padding={5} />
      <Image style={styles.icons.teamLogo} source={logo} />
      <Space padding={5} />
      {!alignRight && (
        <Text style={[matchListStyles.text, matchListStyles.teamName]}>
          {name}
        </Text>
      )}
    </View>
  );
};

export default TeamInfo;
