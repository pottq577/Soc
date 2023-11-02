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
  switchContainer: {
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
    backgroundColor: "red",
  },
  unselected: {
    backgroundColor: "white",
  },
};

export { styles, switchStyle };
