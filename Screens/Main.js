import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image } from "react-native";
import Games from "../Screens/Games";
import News from "./News";
import Analysis from "../Screens/Analysis";
import Simulation from "../Screens/Simulation";
import Following from "../Screens/Following";
import { styles } from "../Styles/mainStyles";

const Tab = createBottomTabNavigator();

const ICONS = {
  GAMES: require("../constants/icons/field.png"),
  NEWS: require("../constants/icons/news.png"),
  ANALYSIS: require("../constants/icons/analysis.png"),
  SIMULATION: require("../constants/icons/simulation.png"),
  FOLLOWING: require("../constants/icons/following.png"),
};

export default Main = () => {
  return (
    <Tab.Navigator initialRouteName="경기">
      <Tab.Screen
        name="경기"
        component={Games}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabel: "경기",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.icon,
                  tintColor: focused ? "purple" : "black",
                }}
                source={ICONS.GAMES}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="뉴스"
        component={News}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabel: "뉴스",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.icon,
                  tintColor: focused ? "purple" : "black",
                }}
                source={ICONS.NEWS}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="분석"
        component={Analysis}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabel: "분석",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.icon,
                  tintColor: focused ? "purple" : "black",
                }}
                source={ICONS.ANALYSIS}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="시뮬레이션"
        component={Simulation}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabel: "시뮬레이션",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.icon,
                  tintColor: focused ? "purple" : "black",
                }}
                source={ICONS.SIMULATION}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="팔로잉"
        component={Following}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabel: "팔로잉",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.icon,
                  tintColor: focused ? "purple" : "black",
                }}
                source={ICONS.FOLLOWING}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
