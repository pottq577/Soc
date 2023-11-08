import { TouchableOpacity, Text } from "react-native";
import { cardStyle, VIEW_FULL_LIST } from "../constants/constants";

const FullListViewButton = ({ category, isPlayer, data, navigation }) => {
  const handlePress = () => {
    navigation.navigate("FullList", { category, isPlayer, data, navigation });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={cardStyle.viewFullList}>
      <Text>{VIEW_FULL_LIST}</Text>
    </TouchableOpacity>
  );
};

export default FullListViewButton;
