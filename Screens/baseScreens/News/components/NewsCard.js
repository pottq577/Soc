import { TouchableOpacity, View, Image, Text } from "react-native";
import {
  IMAGES,
  NO_IMAGE_TEXT,
  styles,
  dynamicImageStyle,
} from "../constants/constants";

function NewsCard({ item, onImageLoad, onNewsSelect, imageHeights }) {
  const isValidImage = item.image_url && item.image_url !== NO_IMAGE_TEXT;

  return (
    <TouchableOpacity onPress={() => onNewsSelect(item.news_url)}>
      <View style={styles.card}>
        <Image
          source={isValidImage ? { uri: item.image_url } : IMAGES.NO_IMAGE}
          style={
            isValidImage
              ? dynamicImageStyle(imageHeights[item.image_url] || 200)
              : styles.noImageStyle
          }
          onLoad={
            isValidImage
              ? (event) => onImageLoad(event, item.image_url)
              : undefined
          }
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <Text style={styles.time}>{item.time_published}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default NewsCard;
