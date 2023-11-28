import { styles } from "../../../Styles/mainStyles";
import Games from "../../Games/Games";
import News from "../../News/News";
import Analysis from "../../Analysis/Analysis";
import Simulation from "../../Simulation/Simulation";
import Following from "../../Following/Following";

const ICONS = {
  GAMES: require("../../../../constants/icons/field.png"),
  NEWS: require("../../../../constants/icons/news.png"),
  ANALYSIS: require("../../../../constants/icons/analysis.png"),
  SIMULATION: require("../../../../constants/icons/simulation.png"),
  FOLLOWING: require("../../../../constants/icons/following.png"),
};
const TAB_BAR_OPTIONS = {
  tabBarActiveTintColor: "purple",
  tabBarLabelStyle: { fontWeight: "bold" },
};
const TAB_SCREENS = [
  { name: "경기", component: Games, icon: "GAMES" },
  { name: "뉴스", component: News, icon: "NEWS" },
  { name: "분석", component: Analysis, icon: "ANALYSIS" },
  { name: "시뮬레이션", component: Simulation, icon: "SIMULATION" },
  { name: "팔로잉", component: Following, icon: "FOLLOWING" },
];

export { styles, ICONS, TAB_BAR_OPTIONS, TAB_SCREENS };
