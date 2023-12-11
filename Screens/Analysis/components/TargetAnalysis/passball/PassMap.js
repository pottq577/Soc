import React, { useState, useEffect } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import { POSTGRES_SERVER_ADDRESS } from "../../../../../constants/config";
import { analysisStyle } from "../../../constants/constants";

const PassMap = ({ item, match_id }) => {
  const [passMapUrl, setPassMapUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPassMap = async (matchId, playerId) => {
      try {
        setIsLoading(true);
        let response = await fetch(
          `${POSTGRES_SERVER_ADDRESS}/get_pass_map/${matchId}/${playerId}`
        );
        let blob = await response.blob();
        setIsLoading(false);
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error("Failed to fetch pass map:", error);
        setIsLoading(false);
      }
    };

    const loadPassMap = async () => {
      const url = await fetchPassMap(match_id, item.wyid);
      setPassMapUrl(url);
    };

    loadPassMap();
  }, [match_id, item.wyid]);

  return (
    <View style={{ padding: 10 }}>
      <View style={{ ...analysisStyle.container, height: 330 }}>
        <Text style={analysisStyle.header}>패스맵</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : passMapUrl ? (
          <Image
            source={{ uri: passMapUrl }}
            style={{
              width: "100%",
              height: 300,
              marginTop: -30,
              marginBottom: -30,
            }}
            resizeMode="contain"
          />
        ) : (
          <Text>패스맵을 불러오는 데 실패했습니다.</Text>
        )}
      </View>
    </View>
  );
};

export default PassMap;
