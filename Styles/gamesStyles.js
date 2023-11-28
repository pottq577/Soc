const styles = {
  container: {
    flex: 1,
  },
  icons: {
    PL_LOGO: {
      width: 93,
      height: 39,
    },
    CALENDAR: {
      width: 30,
      height: 30,
    },
    teamLogo: {
      width: 30,
      height: 30,
    },
  },
};

const calendarList = {
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
};

const leagueCalIcon = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
};

const matchList = {
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    height: 60,
    flex: 1,
  },
  text: {
    fontSize: 16,
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
};

export { styles, calendarList, leagueCalIcon, matchList };
