import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { WebView } from "react-native-webview";
import { styles, IMAGES } from "../constants/constants";

const NewsWebView = ({ url, onBackPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Image style={styles.backIcon} source={IMAGES.BACK} />
      </TouchableOpacity>
    </View>
  );
};

export default NewsWebView;
