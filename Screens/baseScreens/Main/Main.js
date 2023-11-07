import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import screenOptions from "./components/screenOptions";
import { TAB_SCREENS } from "./constants/constants";

const Tab = createBottomTabNavigator();

export default Main = () => {
  return (
    <Tab.Navigator initialRouteName="경기" screenOptions={screenOptions}>
      {TAB_SCREENS.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};
