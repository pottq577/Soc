import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
  },
  noContentStyle: {
    view: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: SCREEN_HEIGHT / 5,
    },
    icon: {
      width: 120,
      height: 120,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 30,
    },
  },
};

const switchStyle = {
  tabsContainer: {
    padding: 10,
    height: 55,
    flex: 1,
  },
  tabs: {
    backgroundColor: "transparent",
    borderColor: "black",
  },
  activeTab: {
    backgroundColor: "black",
  },
  tabText: {
    color: "black",
  },
  activeTabText: {
    color: "white",
  },
};

const seasonStyle = {
  container: {
    flex: 1,
    marginTop: 5,
  },
  button: {
    menu: {
      padding: 10,
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 5,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    icon: {
      width: 20,
      height: 20,
    },
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginLeft: 10,
    marginRight: 10,
  },
  modalView: {
    width: "100%",
    borderColor: "grey",
  },
};

const categoryStyle = {
  container: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginBottom: -10,
    marginLeft: 10,
    borderRadius: 5,
    height: 45,
  },
  category: {
    container: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      paddingRight: 15,
    },
    content: {
      height: 35,
      width: 65,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 0.5,
      borderRadius: 5,
      marginRight: 10,
    },
    text: {
      fontWeight: "500",
      fontSize: 15,
    },
    selected: {
      content: {
        backgroundColor: "blue",
      },
      text: {
        color: "white",
      },
    },
  },
};

const cardStyle = {
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    container: {
      marginTop: 20,
      justifyContent: "space-between",
      borderWidth: 1,
      borderRadius: 10,
    },
    text: {
      head: {
        fontSize: 35,
        fontWeight: "bold",
      },
      name: {
        fontSize: 20,
        fontWeight: "bold",
      },
      score: {
        fontSize: 38,
        fontWeight: "bold",
      },
      teamName: {
        fontSize: 17,
        marginLeft: 5,
        fontWeight: "200",
      },
    },
    image: {
      teamIcon: {
        width: 20,
        height: 20,
      },
      photo: {
        width: 120,
        height: 120,
      },
    },
    first: {
      padding: 10,
      justifyContent: "space-between",
      flexDirection: "row",
      borderBottomWidth: 0.3,
    },
    others: {
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  viewFullList: {
    borderWidth: 1,
    height: 40,
    backgroundColor: "pink",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
};

const listStyle = {
  header: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 10,
    marginLeft: 8,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    container: {
      marginTop: 20,
      justifyContent: "space-between",
      borderWidth: 1,
      borderRadius: 10,
      flexDirection: "row",
      padding: 10,
    },
    text: {
      container: {
        justifyContent: "space-around",
      },
      head: {
        fontSize: 35,
        fontWeight: "bold",
      },
      rank: {
        fontSize: 15,
      },
      name: {
        fontSize: 20,
        fontWeight: "bold",
      },
      score: {
        fontSize: 38,
        fontWeight: "bold",
      },
      teamName: {
        fontSize: 17,
        marginLeft: 5,
        fontWeight: "200",
      },
    },
    image: {
      teamIcon: {
        width: 20,
        height: 20,
      },
      photo: {
        width: 120,
        height: 120,
      },
    },
    first: {
      padding: 10,
      justifyContent: "space-between",
      flexDirection: "row",
      borderBottomWidth: 0.3,
    },
  },
  table: {
    header: {
      container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
      },
      cell: {
        flex: 1,
      },
    },
    row: {
      container: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      },
      cell: {
        flex: 1,
      },
      image: {
        width: 20,
        height: 20,
      },
    },
  },
};

const analysisStyle = {
  container: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 13,
    borderColor: "grey",
    borderTopColor: "blue",
    borderTopWidth: 3,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    container: {
      justifyContent: "space-between",
      flexDirection: "row",
      borderBottomWidth: 0.3,
      paddingVertical: 15,
    },
    subject: {
      title: {
        fontSize: 16,
        fontWeight: "600",
      },
      detail: {
        fontWeight: "500",
        fontSize: 15,
      },
    },
  },
};

const chartStyle = {
  container: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 13,
    borderColor: "grey",
    borderTopColor: "blue",
    borderTopWidth: 3,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  axisStyle: {
    axisLabel: {
      padding: 30,
      fontSize: 14,
      fontWeight: "bold",
      fill: "#6600ff", // Color of the label
      opacity: 0.6,
    },
    axis: { stroke: "none" },
    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
    ticks: {
      stroke: "grey", // Color of the tick values
      size: 0,
      opacity: 0.5,
    },
    tickLabels: {
      fill: "grey", // Tick label color
      opacity: 0.5, // Tick label opacity
    },
  },
  areaStyle: {
    data: {
      fill: "#c299ff",
      fillOpacity: 0.7,
      stroke: "#a366ff",
      strokeWidth: 2,
    },
  },
};

export {
  styles,
  switchStyle,
  seasonStyle,
  cardStyle,
  listStyle,
  analysisStyle,
  categoryStyle,
  chartStyle,
};
