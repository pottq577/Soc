import { Dimensions } from "react-native";

const dynamicImageStyle = (height = 200) => ({
  width: "100%",
  height: height,
});

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
  title: {
    // width: SCREEN_WIWDTH - imageWidth,
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  desc: {
    // width: SCREEN_WIWDTH - imageWidth,
    margin: 10,
    fontSize: 16,
    paddingRight: 10,
  },
  time: {
    justifyContent: "flex-end",
    // backgroundColor: "blue",
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
  noImageStyle: {
    width: "50%",
    height: 100,
    resizeMode: "contain",
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 95,
  },
};

export { styles, dynamicImageStyle };
