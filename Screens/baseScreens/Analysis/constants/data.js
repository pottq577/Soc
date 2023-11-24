// CardContent.js
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
// CardContent.js
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
// PlayerOverview.js
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
// MatchAnalysis.js
const players = [
  { label: "Erling Haaland", value: "Erling Haaland" },
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
