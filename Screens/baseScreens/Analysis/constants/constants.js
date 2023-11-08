import {
  styles,
  cardStyle,
  seasonStyle,
  switchStyle,
  listStyle,
} from "../../../../Styles/analysisStyles";
import Separator from "../../../Separator";
import { SCREEN_HEIGHT } from "../../../../constants/dimensions";

const IMAGES = {
  NO_CONTENT: require("../../../../constants/no_content.png"),
  DOWN_ARROW: require("../../../../constants/icons/down_arrow.png"),
};
const VIEW_FULL_LIST = "View Full List";
const NO_DATA_AVAILABLE = "No Data Available";
const SEASONS = ["2023/24", "2022/23", "2021/22", "2020/21", "2019/20"];
const CATEGORIES = {
  PLAYER: ["Goals", "Assist", "Pass", "Shoot"],
  TEAMS: ["Wins", "Losses"],
};
// 예시 데이터
const playersData = [
  {
    rank: 1,
    name: "Alexis Sanchez",
    score: 77,
    image: require("../../../../constants/77.jpeg"),
    team: require("../../../../constants/arsenal.png"),
    teamName: "Arsenal",
  },
  {
    rank: 2,
    name: "Alexis Sanchez2",
    score: 77,
    image: require("../../../../constants/77.jpeg"),
    team: require("../../../../constants/arsenal.png"),
    teamName: "Arsenal",
  },
  {
    rank: 3,
    name: "Alexis Sanchez3",
    score: 77,
    image: require("../../../../constants/77.jpeg"),
    team: require("../../../../constants/arsenal.png"),
    teamName: "Arsenal",
  },
  {
    rank: 4,
    name: "Alexis Sanchez4",
    score: 77,
    image: require("../../../../constants/77.jpeg"),
    team: require("../../../../constants/arsenal.png"),
    teamName: "Arsenal",
  },
];
const teamData = [
  {
    rank: 1,
    name: "Arsenal",
    score: 44,
    image: require("../../../../constants/arsenal.png"),
  },
  {
    rank: 2,
    name: "Arsenal2",
    score: 44,
    image: require("../../../../constants/arsenal.png"),
  },
  {
    rank: 3,
    name: "Arsenal3",
    score: 44,
    image: require("../../../../constants/arsenal.png"),
  },
  {
    rank: 4,
    name: "Arsenal4",
    score: 44,
    image: require("../../../../constants/arsenal.png"),
  },
];

export {
  styles,
  cardStyle,
  seasonStyle,
  switchStyle,
  listStyle,
  IMAGES,
  VIEW_FULL_LIST,
  NO_DATA_AVAILABLE,
  Separator,
  SEASONS,
  CATEGORIES,
  playersData,
  teamData,
};
