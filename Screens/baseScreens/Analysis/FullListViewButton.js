import { TouchableOpacity, Text } from "react-native";
import { cardStyle } from "../../../Styles/analysisStyles";

const FullListViewButton = () => {
  return (
    <TouchableOpacity style={cardStyle.viewFullList}>
      <Text>View Full List</Text>
    </TouchableOpacity>
  );
};

export default FullListViewButton;
