import React, { useState } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { matchAnalysisStyle, IMAGES } from "../../../constants/constants";
import RenderTable from "./RenderTable";
import useFetchGameData from "../../../hooks/fetchGameData";
import Space from "../../../../../components/Space";

const AnalysisTeam = ({ matchDetails, match_id, team }) => {
  const { imageData, playerStats } = useFetchGameData(
    matchDetails,
    match_id,
    team
  );
  const [toggleTable, setToggleTable] = useState(false);
  const handleToggle = () => {
    setToggleTable(!toggleTable); // 현재 상태를 반전
  };
  // console.log( "Get Image Data URL: ", `../matchAnalysis/${match_id}/${team}`);

  return (
    <View>
      {imageData && (
        <Image
          source={{ uri: imageData }}
          resizeMode="contain"
          style={matchAnalysisStyle.passNetwork}
        />
      )}
      <TouchableOpacity onPress={handleToggle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {toggleTable ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 150,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "600" }}>
                테이블 접기
              </Text>
              <Space paddingHorizontal={3} />
              <Image
                style={{ width: 20, height: 20 }}
                source={IMAGES.UP_ARROW}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 150,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "600" }}>
                테이블 펼치기
              </Text>
              <Space paddingHorizontal={3} />
              <Image
                style={{ width: 20, height: 20 }}
                source={IMAGES.DOWN_ARROW}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
      {toggleTable && (
        <ScrollView style={{ marginBottom: 50 }}>
          <RenderTable playerStats={playerStats} />
        </ScrollView>
      )}
    </View>
  );
};

export default AnalysisTeam;
