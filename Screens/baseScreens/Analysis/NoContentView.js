import { View, Text, Image } from "react-native";
import { styles } from "../../../Styles/analysisStyles";

const IMAGES = {
  NO_CONTENT: require("../../../constants/no_content.png"),
};

const noContentView = () => {
  return (
    <View style={styles.noContentStyle.view}>
      <Image style={styles.noContentStyle.icon} source={IMAGES.NO_CONTENT} />
      <Text style={styles.noContentStyle.text}>No Data Available</Text>
    </View>
  );
};

export default noContentView;
