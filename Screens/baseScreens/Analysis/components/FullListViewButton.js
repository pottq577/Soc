import { TouchableOpacity, Text } from "react-native";
import { cardStyle, VIEW_FULL_LIST } from "../constants/constants";

// 전체 목록 보기 버튼 컴포넌트
const FullListViewButton = ({ category, isPlayer, data, navigation }) => {
  const handlePress = () => {
    navigation.navigate("FullList", { category, isPlayer, data });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={cardStyle.viewFullList}>
      <Text>{VIEW_FULL_LIST}</Text>
    </TouchableOpacity>
  );
};

export default FullListViewButton;
