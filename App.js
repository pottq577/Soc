import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Screens/baseScreens/Main/Main";
import FullList from "./Screens/baseScreens/Analysis/components/FullList";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Could not find image"]);

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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
