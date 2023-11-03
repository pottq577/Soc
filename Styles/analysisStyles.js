import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIWDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 10,
  },
  icon: {
    height: 30,
    width: 30,
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
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
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
  headText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  cardContainer: {
    marginTop: 20,
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 45,
    fontWeight: "bold",
  },
  first: {
    padding: 10,
    justifyContent: "space-between",
    // backgroundColor: "pink",
    flexDirection: "row",
    borderBottomWidth: 0.3,
  },
};

export { styles, switchStyle, seasonStyle, cardStyle };
