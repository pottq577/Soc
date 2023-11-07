import { useCallback } from "react";
import { SERVER_ADDRESS } from "../constants/constants";
import { ActionTypes } from "../constants/ActionTypes";

export const useNewsAction = (dispatch, SCREEN_WIDTH) => {
  const fetchNews = useCallback(async () => {
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
  }, [dispatch]);

  const onImageLoad = useCallback(
    (event, imageUrl) => {
      const { width, height } = event.nativeEvent.source;
      const imageHeight = SCREEN_WIDTH * (height / width);
      dispatch({
        type: ActionTypes.SET_IMAGE_HEIGHT,
        imageUrl,
        height: imageHeight,
      });
    },
    [dispatch, SCREEN_WIDTH]
  ); // 의존성 배열이 비어있기 때문에 컴포넌트가 마운트 될 때 한 번만 생성됨

  const onNewsSelect = useCallback(
    (url) => {
      dispatch({ type: ActionTypes.SET_SELECTED_URL, url: url });
    },
    [dispatch]
  );

  const onRefresh = useCallback(() => {
    dispatch({ type: ActionTypes.SET_REFRESHING, refreshing: true });
    fetchNews();
  }, [fetchNews]);

  return { fetchNews, onImageLoad, onNewsSelect, onRefresh };
};
