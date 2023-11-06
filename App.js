import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Screens/Main";
import playerList from "./Screens/playerList";
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
        {/* <Stack.Screen name="선수 목록" component={playerList} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
