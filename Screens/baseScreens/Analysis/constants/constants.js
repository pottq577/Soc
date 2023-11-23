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
  RIGHT_ARROW: require("../../../../constants/icons/right_arrow.png"),
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
const positionMapping = {
  공격수: "FW",
  미드필더: "MF",
  수비수: "DF",
  골키퍼: "GK",
};
const positionBorderStyles = (positionKey) => ({
  borderTopColor: positionColors[positionKey],
  borderTopWidth: 3,
  borderLeftWidth: 0.5,
  borderRightWidth: 0.5,
});
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
const leagueData = [
  {
    rank: 1,
    teamName: "FC Barcelona",
    wins: 20,
    draws: 5,
    losses: 3,
    points: 65,
  },
  {
    rank: 2,
    teamName: "Real Madrid",
    wins: 19,
    draws: 6,
    losses: 3,
    points: 63,
  },
  {
    rank: 3,
    teamName: "Atletico Madrid",
    wins: 18,
    draws: 7,
    losses: 3,
    points: 61,
  },
];
const squadData = {
  attackers: [
    { name: "Erling Haaland", position: "ST" },
    { name: "Mohamed Salah", position: "RW" },
    { name: "Harry Kane", position: "ST" },
  ],
  midfielders: [
    { name: "Kevin De Bruyne", position: "CM" },
    { name: "Bruno Fernandes", position: "CAM" },
    { name: "N'Golo Kanté", position: "CDM" },
  ],
  defenders: [
    { name: "Virgil van Dijk", position: "CB" },
    { name: "Ruben Dias", position: "CB" },
    { name: "Trent Alexander-Arnold", position: "RB" },
  ],
  goalkeepers: [
    { name: "Alisson Becker", position: "GK" },
    { name: "Ederson", position: "GK" },
    { name: "David de Gea", position: "GK" },
  ],
};

const matches = [
  {
    date: "2018-05-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 0",
  },
  {
    date: "2018-06-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 1",
  },
  {
    date: "2018-07-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 2",
  },
  {
    date: "2018-08-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 3",
  },
  {
    date: "2018-09-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
  },
  {
    date: "2018-10-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
  },
  {
    date: "2018-11-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
  },
  {
    date: "2018-11-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
  },
  {
    date: "2018-11-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
  },
  {
    date: "2018-12-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
  },
  {
    date: "2018-01-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
  },
  {
    date: "2018-02-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
  },
  {
    date: "2018-03-13T14:00:00",
    home: "맨시티",
    away: "아스날",
    score: "0 : 4",
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
  positionMapping,
  positionBorderStyles,
  domains,
  overviewData,
  recordData,
  statData,
  data,
  leagueData,
  squadData,
  matches,
};
