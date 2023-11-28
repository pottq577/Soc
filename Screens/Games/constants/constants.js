import Separator from "../../../components/Separator";
import {
  styles,
  calendarList,
  leagueCalIcon,
  matchList,
} from "../../../Styles/gamesStyles";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../Analysis/constants/constants";

const IMAGES = {
  PL_LOGO: require("../../../../constants/Premier_League-Logo.wine.png"),
  CALENDAR: require("../../../../constants/icons/calendar.png"),
  ARSENAL: require("../../../../constants/arsenal.png"),
  MUN: require("../../../../constants/mu.png"),
};

const teams = [
  {
    rank: 1,
    logo: "https://i.namu.wiki/i/jAvcfbetxbl2lvkrJkQQRwiw52fiwNd3AGv__6XDZXBXX3Q5sjvUN2T7LkGxTI1pUVexTqWNpiGRiBBfO0vtPsc2hmiQhqZear3lPeqf0lyH7fWci4qxvwR0Zo5g2jlh8D-MetOL_ymO9yuRQsOWig.svg",
    name: "Liverpool",
    games: 38,
    points: 99,
    wins: 32,
    draws: 3,
    losses: 3,
    goalsFor: 85,
    goalsAgainst: 33,
    goalDifference: 52,
  },
  {
    rank: 2,
    logo: "https://i.namu.wiki/i/upN2Kwf8mJWzSLu6agfVxjNs6d6Bxt7nXONnTBBdfRlHL9t66w0NgEySKcIIrMxyT5_TE6472pUDwzeKaR2rDpvUyl7S-U9YVqGz_WC7q3yvgAomU-G33E19bCduHoghrDmJnfSzsaEUJBV4WfaEZg.svg",
    name: "Manchester City",
    games: 38,
    points: 81,
    wins: 26,
    draws: 3,
    losses: 9,
    goalsFor: 102,
    goalsAgainst: 35,
    goalDifference: 67,
  },
  {
    rank: 3,
    logo: "https://i.namu.wiki/i/J0r7UFY-fO7y7U__uu5OIdYb_i4RPcxXb5rjiicLkRiZPYaI8IE5fifoycpo49CAmEW2NLFledAL5O0duO48uRnx2J26NMV3SwahYm7FV9nisaZq_Fmvpf5adowa30DzkMxZe9_cIFd-aQAY-hNKRQ.svg",
    name: "Manchester United",
    games: 38,
    points: 66,
    wins: 18,
    draws: 12,
    losses: 8,
    goalsFor: 66,
    goalsAgainst: 36,
    goalDifference: 30,
  },
  {
    rank: 4,
    logo: "https://i.namu.wiki/i/a8hb2HwSdhNodharwUeVYcLXxH913qLSQ55W17hDAxl9DbJnk3xovl_vdWaxFx_ZOC7-tpcKe7iM50UwbkOWnAVIKvwU3ldocRj-_P9zEKlbEpwYIMSxhzYkYkj6BANI5YYNpqWQvIQcVlV0DhNfXw.svg",
    name: "Chelsea",
    games: 38,
    points: 66,
    wins: 20,
    draws: 6,
    losses: 12,
    goalsFor: 69,
    goalsAgainst: 54,
    goalDifference: 15,
  },
  {
    rank: 5,
    logo: "https://i.namu.wiki/i/fDcCG58t2yBuvZtV69DsSQf-5YKnni9r6juGFR5eRE8Gk1fXH9Soyv9BKLi9kBtHEg8vbvYv-32h-vsEKKt_mAhCcuEeF7VacYUpImAF5t7XayV2r374iJcmDwALshqZ2eEdu9qz5lSosma7ZaS84g.svg",
    name: "Leicester City",
    games: 38,
    points: 62,
    wins: 18,
    draws: 8,
    losses: 12,
    goalsFor: 67,
    goalsAgainst: 41,
    goalDifference: 26,
  },
];

export {
  Separator,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styles,
  calendarList,
  leagueCalIcon,
  matchList,
  IMAGES,
  teams,
};
