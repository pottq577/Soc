import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNewsAction } from "./hooks/useNewsAction";
import NewsCard from "./components/NewsCard";
import NewsWebView from "./components/NewsWebView";
import { ActionTypes } from "./constants/ActionTypes";
import { styles, SCREEN_WIDTH, LOADING_MESSAGE } from "./constants/constants";
import { useNewsReducer } from "./hooks/useNewsReducer";

export default function NewsScreen() {
  const { state, dispatch } = useNewsReducer(); // Custom Hook 사용
  const { fetchNews, onImageLoad, onNewsSelect, onRefresh } = useNewsAction(
    dispatch,
    SCREEN_WIDTH
  );

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // 뉴스 사이트 진입
  if (state.selectedUrl) {
    return (
      <NewsWebView
        url={state.selectedUrl}
        onBackPress={() =>
          dispatch({ type: ActionTypes.SET_SELECTED_URL, url: null })
        }
      />
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
          <Text>{LOADING_MESSAGE}</Text>
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
