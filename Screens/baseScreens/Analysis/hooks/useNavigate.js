import { useNavigation } from "@react-navigation/native";

export default function useNavigate() {
  const navigation = useNavigation();
  return navigation;
}
