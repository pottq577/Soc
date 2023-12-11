import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { POSTGRES_SERVER_ADDRESS } from "../../../../../constants/config";
import { analysisStyle } from "../../../constants/constants";

const PassMap = ({ item, match_id }) => {
  const [passMapUrl, setPassMapUrl] = useState(null);

  useEffect(() => {
    const fetchPassMap = async (matchId, playerId) => {
      try {
        let response = await fetch(
          `${POSTGRES_SERVER_ADDRESS}/get_pass_map/${matchId}/${playerId}`
        );
        let blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error("Failed to fetch pass map:", error);
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
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>패스맵</Text>
        {passMapUrl && (
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
        )}
      </View>
    </View>
  );
};

export default PassMap;
