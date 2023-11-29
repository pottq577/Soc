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

export { matches };
