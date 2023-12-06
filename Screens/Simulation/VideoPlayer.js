import React from "react";
import { View } from "react-native";
import Video from "react-native-video";

function VideoPlayer() {
  return (
    <View>
      <Video
        // source={require("./KakaoTalk_Video_2023-12-06-16-23-43.mp4")} // 로컬 비디오 파일
        source={require("./KakaoTalk_Video_2023-12-06-16-23-43.mp4")}
        style={{ width: "100%", height: 300 }} // 원하는 스타일로 설정
        controls={true} // 컨트롤러 활성화
        resizeMode="contain"
      />
    </View>
  );
}

export default VideoPlayer;
