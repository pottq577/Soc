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

export {
  styles,
  switchStyle,
  seasonStyle,
  cardStyle,
  listStyle,
  analysisStyle,
};
