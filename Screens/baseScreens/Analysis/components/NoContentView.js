import { View, Text, Image } from "react-native";
import { styles, IMAGES, NO_DATA_AVAILABLE } from "../constants/constants";

const noContentView = () => {
  return (
    <View style={styles.noContentStyle.view}>
      <Image style={styles.noContentStyle.icon} source={IMAGES.NO_CONTENT} />
      <Text style={styles.noContentStyle.text}>{NO_DATA_AVAILABLE}</Text>
    </View>
  );
};

export default noContentView;
