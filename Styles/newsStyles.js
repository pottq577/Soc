import { Dimensions } from "react-native";

const { width: SCREEN_WIWDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");
const centerConstant = 200;

const styles = {
  card: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  desc: {
    margin: 10,
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT - centerConstant,
  },
  backIcon: {
    width: 40,
    height: 40,
    tintColor: "rgb(230, 236, 255)",
  },
  backButton: {
    position: "absolute",
    top: 600,
    left: 10,
    padding: 10,
    backgroundColor: "rgba(102, 102, 255, 0.7)",
    borderRadius: 15,
    zIndex: 10,
  },
};

export { styles };
