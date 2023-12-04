import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";

const styles = {
  container: {
    flex: 1,
  },
  icons: {
    PL_LOGO: {
      width: 93,
      height: 39,
      margin: 10,
    },
    CALENDAR: {
      width: 30,
      height: 30,
      margin: 10,
    },
    teamLogo: {
      width: 30,
      height: 30,
    },
  },
};

const calendarStyle = {
  container: {
    text: {
      padding: 5,
      height: 30,
      borderWidth: 0.4,
      borderRadius: 10,
      marginLeft: 10,
    },
  },
  font: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    borderWidth: 1,
    borderRadius: 15,
    height: 30,
    width: SCREEN_WIDTH / 5,
    marginLeft: SCREEN_WIDTH / 1.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
  },
  modalContainer: {
    marginBottom: SCREEN_HEIGHT / 25,
    padding: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 흐린 배경
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: SCREEN_HEIGHT / 4.5,
    },
    icon: {
      width: 60,
      height: 60,
    },
    text: {
      fontWeight: "bold",
      fontSize: 16,
    },
  },
  selectedDateStyle: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 5,
  },
  selectedFontStyle: {
    color: "white",
    fontWeight: "bold",
  },
};

const leagueCalIcon = {
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  PL_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  CALENDAR_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
};

const matchListStyles = {
  container: {
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    height: 100,
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  score: {
    fontSize: 20,
    fontWeight: "600",
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
  },
  scoreContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  teamName: {
    flexShrink: 1, // 텍스트가 화면을 넘어가지 않도록 함
  },
  matchHeader: {
    container: {
      flexDirection: "row",
      padding: 20,
      marginTop: 20,
      alignItems: "center",
    },
    teamLogo: {
      width: 50,
      height: 50,
    },
    teamContainer: {
      alignItems: "center",
      flex: 1,
    },
    scoreContainer: {
      justifyContent: "center",
      flexDirection: "row",
      flex: 1,
    },
  },
};

const overviewStyle = {
  container: {
    padding: 10,
  },
  timeline: {
    container: {
      // 타임라인 전체에 대한 스타일
      padding: 10,
      borderWidth: 1,
      borderRadius: 15,
    },
    eventRow: {
      // 개별 이벤트 행에 대한 스타일
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 5,
    },
    event: {
      // 공통 이벤트 스타일
      flex: 1,
      textAlign: "center",
    },
    time: {
      // 이벤트 시간에 대한 스타일
      fontWeight: "bold",
    },
  },
  details: {
    container: {
      // padding: 10,
      // borderWidth: 1,
      // borderRadius: 15,
    },
    teamData: {
      fontSize: 16,
    },
    label: {
      fontSize: 16,
    },
  },
};

const rankingStyle = {
  container: {
    padding: 10,
  },
};

export {
  styles,
  calendarStyle,
  leagueCalIcon,
  matchListStyles,
  overviewStyle,
  rankingStyle,
};
