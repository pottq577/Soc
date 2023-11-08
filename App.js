import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Screens/baseScreens/Main/Main";
import FullList from "./Screens/baseScreens/Analysis/screens/FullList";
import Target from "./Screens/baseScreens/Analysis/screens/Target";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FullList"
          component={FullList}
          options={{
            headerShown: true,
            title: "목록",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="Target"
          component={Target}
          options={{
            headerShown: true,
            title: "분석",
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
