import { View, Text, Image } from "react-native";
import { styles, IMAGES, NO_DATA_AVAILABLE } from "../constants/constants";

// 19/20 시즌 이외의 시즌 선택 시 사용 가능한 데이터 없음 출력
const noContentView = () => {
  return (
    <View style={styles.noContentStyle.view}>
      <Image style={styles.noContentStyle.icon} source={IMAGES.NO_CONTENT} />
      <Text style={styles.noContentStyle.text}>{NO_DATA_AVAILABLE}</Text>
    </View>
  );
};

export default noContentView;
