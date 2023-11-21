import {
  styles,
  cardStyle,
  seasonStyle,
  switchStyle,
  listStyle,
  analysisStyle,
  categoryStyle,
  chartStyle,
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
const positionColors = {
  FW: "#bc0f0f",
  MF: "#469719",
  DF: "#468cff",
  GK: "#ffae44",
};
/**
 * !! 최댓값 수정 필요!
 * !! 최댓값: 각 domains 별 선수 데이터의 최댓값을 일의 자리에서 올림
 * ?? 예시) 선수의 골 최댓값이 24면 최댓값은 30으로 설정
 */
const domains = {
  출전수: [0, 100],
  출전시간: [0, 120],
  골: [0, 30],
  어시스트: [0, 50],
  xG: [0, 100],
  xA: [0, 100],
  _90xG: [0, 100],
  _90xA: [0, 100],
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
const overviewData = {
  Nationality: {
    label: "Chile",
    image: require("../../../../constants/Chile.png"),
  },
  Birth: "21/07/2000",
  Age: 23,
  Club: {
    label: "Arsenal",
    image: require("../../../../constants/arsenal.png"),
  },
  Position: {
    label: "MF",
  },
};
const recordData = {
  Appearances: 77,
  Goals: 30,
  Assists: 10,
};
const statData = {
  Attack: {
    Goals: 77,
    Shots: 10,
  },
  Team_Play: {
    Assists: 3,
    Passes: 30,
  },
};
const data = [
  {
    출전수: 80,
    출전시간: 20,
    골: 30,
    어시스트: 10,
    xG: 60,
    xA: 60,
    _90xG: 60,
    _90xA: 60,
  },
];

export {
  styles,
  cardStyle,
  seasonStyle,
  switchStyle,
  listStyle,
  analysisStyle,
  categoryStyle,
  chartStyle,
  IMAGES,
  VIEW_FULL_LIST,
  NO_DATA_AVAILABLE,
  Separator,
  SEASONS,
  CATEGORIES,
  playersData,
  teamData,
  positionColors,
  domains,
  overviewData,
  recordData,
  statData,
  data,
};
