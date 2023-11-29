import { IMAGES } from "./constants";

const teamLogos = {
  "Newcastle United": IMAGES.ARSENAL,
  "Tottenham Hotspur": IMAGES.MUN,
};

const actualData = [
  {
    datetime: "2017-08-13 12:30:00",
    team1_name: "Newcastle United",
    team1_goals: 0,
    team2_name: "Tottenham Hotspur",
    team2_goals: 2,
  },
  {
    datetime: "2017-09-13 12:30:00",
    team1_name: "Newcastle United",
    team1_goals: 0,
    team2_name: "Tottenham Hotspur",
    team2_goals: 2,
  },
  {
    datetime: "2017-10-13 12:30:00",
    team1_name: "Newcastle United",
    team1_goals: 0,
    team2_name: "Tottenham Hotspur",
    team2_goals: 2,
  },
];

const matches = actualData.map((match) => ({
  home: match.team1_name,
  homeScore: match.team1_goals,
  homeLogo: teamLogos[match.team1_name], // 팀 이름에 해당하는 로고를 매핑합니다
  away: match.team2_name,
  awayScore: match.team2_goals,
  awayLogo: teamLogos[match.team2_name], // 팀 이름에 해당하는 로고를 매핑합니다
  datetime: match.datetime, // 경기 날짜와 시간
}));

const timelineEvents = [
  { time: "10", type: "goal", team: "home", player: "Player 1" },
  { time: "27", type: "yellow-card", team: "away", player: "Player 2" },
  { time: "45+2", type: "goal", team: "away", player: "Player 3" },
  { time: "59", type: "red-card", team: "home", player: "Player 4" },
  { time: "75", type: "goal", team: "home", player: "Player 5" },
];

export { matches, timelineEvents };
