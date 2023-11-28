import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Screens/Main/Main";
import FullList from "./Screens/Analysis/screens/FullList";
import Target from "./Screens/Analysis/screens/Target";
import MatchAnalysis from "./Screens/Analysis/screens/MatchAnalysis";
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
        <Stack.Screen
          name="MatchAnalysis"
          component={MatchAnalysis}
          options={{
            headerShown: true,
            title: "경기 분석",
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
