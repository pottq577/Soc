import { View } from "react-native";
import Separator from "../../components/Separator";
import LeagueCalendarIcon from "./components/LeagueCalendarIcon";
import Calendar from "./components/Calendar";
import MatchCards from "./screens/MatchCards";

const GameScreen = () => {
  return (
    <View>
      <LeagueCalendarIcon />
      <Calendar />
      <Separator />
      <MatchCards />
    </View>
  );
};

export default GameScreen;