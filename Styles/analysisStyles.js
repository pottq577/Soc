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
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    padding: 10,
    margin: 10,
  },
  switchBtn: {
    width: 130,
    height: 40,
    borderWidth: "1px",
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  selected: {
    backgroundColor: "#e0ccff",
  },
  unselected: {
    backgroundColor: "white",
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
};

const cardStyle = {
  container: { flex: 1 },
};

export { styles, switchStyle, seasonStyle, cardStyle };
