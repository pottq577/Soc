import {
  styles,
  cardStyle,
  seasonStyle,
  switchStyle,
  listStyle,
  analysisStyle,
  categoryStyle,
  chartStyle,
} from "../../../Styles/analysisStyles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/dimensions";

const IMAGES = {
  NO_CONTENT: require("../../../constants/no_content.png"),
  DOWN_ARROW: require("../../../constants/icons/down_arrow.png"),
  RIGHT_ARROW: require("../../../constants/icons/right_arrow.png"),
};
const VIEW_FULL_LIST = "View Full List";
const NO_DATA_AVAILABLE = "No Data Available";
const SEASONS = [
  "2023/24",
  "2022/23",
  "2021/22",
  "2020/21",
  "2019/20",
  "2018/19",
  "2017/18",
];
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
 * !! 최댓값은 각 domains 별 선수 데이터의 최댓값을 일의 자리에서 올림
 * ?? 선수의 골 최댓값이 24면 최댓값은 30으로 설정
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

const analysisTypes = [
  "이벤트 발생 위치",
  "패스 경로",
  "슈팅 히트맵",
  "속력 그래프",
  "볼 히트맵",
  "스프린트 경로",
  "패스 네트워크",
];

const pickerType = {
  analysisType: "analysisType",
  player: "player",
};

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
  SEASONS,
  CATEGORIES,
  positionColors,
  positionMapping,
  positionBorderStyles,
  domains,
  analysisTypes,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  pickerType,
};
