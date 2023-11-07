import { TouchableOpacity, Text } from "react-native";
import { cardStyle, VIEW_FULL_LIST } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";

const FullListViewButton = ({ category, isPlayer, data }) => {
  const navigation = useNavigation();
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
