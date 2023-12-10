import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { POSTGRES_SERVER_ADDRESS } from "../../constants/config";
// 패스 맵을 서버로부터 가져오는 함수
const fetchPassMap = async (matchId, playerId) => {
  try {
    let response = await fetch(
      POSTGRES_SERVER_ADDRESS + `/get_pass_map/${matchId}/${playerId}`
    );
    let blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to fetch pass map:", error);
  }
};

// 선수 정보 및 패스 맵을 표시하는 컴포넌트
const PlayerInformation = ({ route }) => {
  const { player, matchId, teamName } = route.params;
  const [passMapUrl, setPassMapUrl] = useState(null);

  useEffect(() => {
    const loadPassMap = async () => {
      const url = await fetchPassMap(matchId, player.wyid);
      setPassMapUrl(url);
    };

    loadPassMap();
  }, [matchId, player.wyid]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {player.firstname} {player.lastname}
        </Text>
        <Text style={styles.detail}>팀 ID: {player.currentteamid}</Text>
        <Text style={styles.detail}>팀 이름: {teamName}</Text>
        <Text style={styles.detail}>포지션: {player.role_code2}</Text>
        <Text style={styles.detail}>국적: {player.birtharea_name}</Text>
        <Text style={styles.detail}>신장: {player.height} cm</Text>
        <Text style={styles.detail}>몸무게: {player.weight} kg</Text>
        <Text style={styles.detail}>주발: {player.foot}</Text>
      </View>
      {passMapUrl && (
        <Image
          source={{ uri: passMapUrl }}
          style={styles.passMap}
          resizeMode="contain"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  infoContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
  passMap: {
    width: "100%",
    height: 300,
    marginTop: 20,
  },
});

export default PlayerInformation;
