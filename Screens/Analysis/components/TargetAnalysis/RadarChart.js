import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import { chartStyle, analysisStyle } from "../../constants/constants";
// 예시 데이터
import { radarData } from "../../constants/data";
import { POSTGRES_SERVER_ADDRESS } from "../../../../constants/config";

const chartLabels = ["골", "어시스트", "유효슈팅", "유효패스", "패스정확도"];

// 선수에 대한 레이더 차트 출력
const RadarChart = ({ item }) => {
  // console.log("radarchart: ", item);
  const [maxValues, setMaxValues] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  // 서버로부터 최대값 데이터를 가져오는 함수
  const fetchMaxValues = async () => {
    try {
      const response = await fetch(`${POSTGRES_SERVER_ADDRESS}/max_value`);
      const data = await response.json();
      setMaxValues(data);
    } catch (error) {
      console.error("Error fetching max values:", error);
    }
  };

  // 서버로부터 플레이어 데이터를 가져오는 함수
  const fetchPlayerData = async () => {
    try {
      const response = await fetch(`${POSTGRES_SERVER_ADDRESS}/RadarChart`);
      const data = await response.json();
      const playerStats = data.find((p) => p.wyid === item.wyid);
      setPlayerData(playerStats);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  useEffect(() => {
    fetchMaxValues();
    fetchPlayerData();
  }, []);

  // 차트 데이터를 처리하는 함수
  const processChartData = () => {
    if (!playerData || !maxValues) return [];

    return [
      {
        key: "골",
        value: (playerData.total_goals / maxValues.max_goals) * 100,
      },
      {
        key: "어시스트",
        value: (playerData.total_assists / maxValues.max_assists) * 100,
      },
      {
        key: "유효슈팅",
        value:
          (playerData.total_shots_on_target / maxValues.max_shots_on_target) *
          100,
      },
      {
        key: "유효패스",
        value: (playerData.total_acc_passes / maxValues.max_acc_passes) * 100,
      },
      {
        key: "패스정확도",
        value:
          (playerData.avg_pass_accuracy / maxValues.max_avg_pass_accuracy) *
          100,
      },
    ].map((item) => ({ ...item, value: isNaN(item.value) ? 0 : item.value }));
  };

  const processedData = processChartData();

  return (
    <View style={analysisStyle.container}>
      <Text style={analysisStyle.squad.headerFont.title}>스탯 (%)</Text>
      <View style={chartStyle.container}>
        {!playerData || !maxValues ? (
          <View style={{ padding: 100 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            domain={{ y: [0, 100] }}
          >
            {chartLabels.map((label, i) => (
              <VictoryPolarAxis
                key={`polar-axis-${i}`}
                dependentAxis
                style={chartStyle.axisStyle}
                tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
                labelPlacement="perpendicular"
                axisValue={i + 1}
                label={label}
                // 최대값이 100인 백분율로 표시하므로 tickFormat 수정이 필요 없음
              />
            ))}
            <VictoryArea
              data={processedData}
              x="key"
              y="value"
              style={chartStyle.areaStyle}
            />
          </VictoryChart>
        )}
      </View>
    </View>
  );
};

export default RadarChart;
