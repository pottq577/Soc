import React, { useState, useEffect } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import { POSTGRES_SERVER_ADDRESS } from "../../../../constants/config";
import { analysisStyle } from "../../constants/constants";

const MapDisplay = ({ item, match_id, type }) => {
  const [mapUrl, setMapUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMap = async (matchId, playerId, mapType) => {
      try {
        setIsLoading(true);
        let response = await fetch(
          `${POSTGRES_SERVER_ADDRESS}/get_${mapType}_map/${matchId}/${playerId}`
        );
        let blob = await response.blob();
        setIsLoading(false);
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error(`Failed to fetch ${mapType} map:`, error);
        setIsLoading(false);
      }
    };

    const loadMap = async () => {
      const url = await fetchMap(match_id, item.wyid, type);
      setMapUrl(url);
    };

    loadMap();
  }, [match_id, item.wyid, type]);

  return (
    <View style={{ padding: 10 }}>
      <View style={{ ...analysisStyle.container, height: 330 }}>
        <Text style={analysisStyle.header}>
          {type === "pass" ? "패스맵" : "터치맵"}
        </Text>
        {isLoading ? (
          <View style={{ padding: 100 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : mapUrl ? (
          <Image
            source={{ uri: mapUrl }}
            style={{
              width: "100%",
              height: 300,
              marginTop: -30,
              marginBottom: -30,
            }}
            resizeMode="contain"
          />
        ) : (
          <Text>
            {type === "pass" ? "패스맵" : "터치맵"}을 불러오는 데 실패했습니다.
          </Text>
        )}
      </View>
    </View>
  );
};

export default MapDisplay;
