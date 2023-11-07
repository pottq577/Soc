import { Image } from "react-native";
import {
  styles,
  ICONS,
  TAB_BAR_OPTIONS,
  TAB_SCREENS,
} from "../constants/constants";

const screenOptions = ({ route }) => {
  const { icon } = TAB_SCREENS.find((item) => item.name === route.name) || {};
  return {
    tabBarLabel: route.name,
    tabBarIcon: ({ focused }) => (
      <Image
        style={{
          ...styles.icon,
          tintColor: focused ? "purple" : "black",
        }}
        source={ICONS[icon]}
      />
    ),
    ...TAB_BAR_OPTIONS,
  };
};

export default screenOptions;
