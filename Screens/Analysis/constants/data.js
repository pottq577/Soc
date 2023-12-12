// CardContent.js
const playersData = [
  {
    rank: 1,
    name: "손흥민",
    score: 30,
    image: require("../../../constants/players/son.png"),
    team: require("../../../constants/teams/hotspur.png"),
    teamName: "Tottenham Hotspur",
  },
  {
    rank: 2,
    name: "엘링 홀란드",
    score: 20,
    image: require("../../../constants/77.jpeg"),
    team: require("../../../constants/teams/mancity.png"),
    teamName: "Manchester City",
  },
  {
    rank: 3,
    name: "마커스 래시포드",
    score: 10,
    image: require("../../../constants/77.jpeg"),
    team: require("../../../constants/teams/manuni.png"),
    teamName: "Manchester United",
  },
  {
    rank: 4,
    name: "Alexis Sanchez4",
    score: 77,
    image: require("../../../constants/77.jpeg"),
    team: require("../../../constants/arsenal.png"),
    teamName: "Arsenal",
  },
];
// CardContent.js
const teamData = [
  {
    rank: 1,
    name: "Tottenham Hotspur",
    score: 30,
    image: require("../../../constants/teams/hotspur.png"),
  },
  {
    rank: 2,
    name: "Manchester City",
    score: 20,
    image: require("../../../constants/teams/mancity.png"),
  },
  {
    rank: 3,
    name: "Manchester United",
    score: 10,
    image: require("../../../constants/teams/manuni.png"),
  },
  {
    rank: 4,
    name: "Arsenal4",
    score: 44,
    image: require("../../../constants/arsenal.png"),
  },
];
// PlayerOverview.js
const overviewData = {
  Nationality: {
    label: "Korea",
    image: require("../../../constants/national/korea.png"),
  },
  Birth: "07/08/1992",
  Age: 31,
  Club: {
    label: "Tottenham Hotspur",
    image: require("../../../constants/teams/hotspur.png"),
  },
  Position: {
    label: "FW",
  },
};
// PlayerOverview.js
const recordData = {
  Appearances: 77,
  Goals: 30,
  Assists: 10,
};
// PlayerOverview.js
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
// RadarChart.js
const radarData = [
  {
    골: 20,
    어시스트: 100,
    골: 3,
    어시스트: 5,
    xG: 5.29,
    xA: 4.42,
  },
];
// TeamOverview.js
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
// TeamOverview.js
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
// MatchList.js
const matches = [
  {
    date: "2018-05-13T14:00:00",
    home: "토트넘",
    away: "아스날",
    score: "3 : 3",
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
// MatchAnalysis.js
const players = [
  { label: "손흥민", value: "손흥민" },
  { label: "Mohamed Salah", value: "Mohamed Salah" },
  { label: "Kevin De Bruyne", value: "Kevin De Bruyne" },
  { label: "Erling Haaland", value: "Erling Haaland" },
  { label: "Mohamed Salah", value: "Mohamed Salah" },
  { label: "Kevin De Bruyne", value: "Kevin De Bruyne" },
  { label: "Erling Haaland", value: "Erling Haaland" },
  { label: "Mohamed Salah", value: "Mohamed Salah" },
  { label: "Kevin De Bruyne", value: "Kevin De Bruyne" },
];

export {
  playersData,
  teamData,
  overviewData,
  recordData,
  statData,
  radarData,
  leagueData,
  squadData,
  matches,
  players,
};
