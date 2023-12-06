import React from "react";
import { View } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";

const SimulationScreen = () => {
  return (
    <View>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: require("./11.mp4"),
          // 추가적인 Video 속성들을 여기에 기재
        }}
        inFullscreen={true}
        showControlsOnLoad={true}
        showFullscreenButton={true}
        style={{ width: 1000, height: 300 }}
      />
    </View>
  );
};

export default SimulationScreen;
