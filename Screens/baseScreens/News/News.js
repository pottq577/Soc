import React, { useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { styles, dynamicImageStyle } from "../../../Styles/newsStyles";
import { SERVER_ADDRESS } from "../../../constants/config";

const { width: SCREEN_WIWDTH } = Dimensions.get("window");
const IMAGES = {
  BACK: require("../../../constants/icons/back-button.png"),
  NO_IMAGE: require("../../../constants/image_not_found.png"),
};
const NO_IMAGE_TEXT = "No Image";
const ActionTypes = {
  SET_NEWS: "SET_NEWS",
  SET_SELECTED_URL: "SET_SELECTED_URL",
  SET_LOADING: "SET_LOADING",
  SET_REFRESHING: "SET_REFRESHING",
  SET_IMAGE_HEIGHT: "SET_IMAGE_HEIGHT",
};

const initialState = {
  news: [],
  selectedUrl: null,
  isLoading: true,
  isRefreshing: false,
  imageHeights: {},
};

function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_NEWS:
      return {
        ...state,
        news: action.news,
        isLoading: false,
        isRefreshing: false,
      };
    case ActionTypes.SET_SELECTED_URL:
      return { ...state, selectedUrl: action.url };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.loading };
    case ActionTypes.SET_REFRESHING:
      return { ...state, isRefreshing: action.refreshing };
    case ActionTypes.SET_IMAGE_HEIGHT:
      return {
        ...state,
        imageHeights: {
          ...state.imageHeights,
          [action.imageUrl]: action.height,
        },
      };
    default:
      return state;
  }
}

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

export default function NewsScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNews = useCallback(() => {
    dispatch({ type: ActionTypes.SET_LOADING, loading: true });
    fetch(`${SERVER_ADDRESS}/get-news`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: ActionTypes.SET_NEWS, news: data });
        dispatch({ type: ActionTypes.SET_LOADING, loading: false }); // 데이터 로딩이 완료되면 isLoading을 false로 설정
        dispatch({ type: ActionTypes.SET_REFRESHING, refreshing: false });
      })
      .catch((error) => {
        console.error("Error fetching the news:", error);
        dispatch({ type: ActionTypes.SET_LOADING, loading: false }); // 에러 발생 시에도 isLoading을 false로 설정
        dispatch({ type: ActionTypes.SET_REFRESHING, refreshing: false });
      });
  }, []);

  const onImageLoad = useCallback((event, imageUrl) => {
    const { width, height } = event.nativeEvent.source;
    const imageHeight = SCREEN_WIWDTH * (height / width);
    dispatch({
      type: ActionTypes.SET_IMAGE_HEIGHT,
      imageUrl,
      height: imageHeight,
    });
  }, []); // 의존성 배열이 비어있기 때문에 컴포넌트가 마운트 될 때 한 번만 생성됨

  const onNewsSelect = useCallback((newsUrl) => {
    dispatch({ type: ActionTypes.SET_SELECTED_URL, url: newsUrl });
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const onRefresh = useCallback(() => {
    dispatch({ type: ActionTypes.SET_REFRESHING, refreshing: true });
    fetchNews();
  }, [fetchNews]);

  if (state.selectedUrl) {
    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: state.selectedUrl }} style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            dispatch({ type: ActionTypes.SET_SELECTED_URL, url: null })
          }
        >
          <Image style={styles.backIcon} source={IMAGES.BACK} />
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
          refreshing={state.isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {state.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>뉴스를 불러오는 중입니다.</Text>
        </View>
      ) : (
        state.news.map((item, index) => (
          <NewsCard
            key={index}
            item={item}
            onImageLoad={onImageLoad}
            onNewsSelect={onNewsSelect}
            imageHeights={state.imageHeights}
          />
        ))
      )}
    </ScrollView>
  );
}
