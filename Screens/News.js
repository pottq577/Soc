import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { styles } from "../Styles/newsStyles";

const ICONS = {
  BACK: require("../constants/icons/back-button.png"),
};

const baseURL = "http://10.20.103.45:5001";

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null); // 선택된 뉴스 URL 상태
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = () => {
    setIsLoading(true);
    fetch(`${baseURL}/get-news`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setIsLoading(false); // 데이터 로딩이 완료되면 isLoading을 false로 설정
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.error("Error fetching the news:", error);
        setIsLoading(false); // 에러 발생 시에도 isLoading을 false로 설정
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchNews();
  };

  if (selectedUrl) {
    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: selectedUrl }} style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedUrl(null)}
        >
          <Image style={styles.backIcon} source={ICONS.BACK} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        // 뉴스 목록 새로고침 핸들링
        <RefreshControl
          tintColor="transparent"
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {isLoading ? ( // 뉴스 목록 로딩 핸들링
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>뉴스를 불러오는 중입니다.</Text>
        </View>
      ) : (
        news.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedUrl(item.news_url)}
          >
            <View style={styles.card}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
