import { View, Text } from "react-native";
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import { domains, chartStyle, analysisStyle } from "../../constants/constants";
// 예시 데이터
import { radarData } from "../../constants/data";

// 선수에 대한 레이더 차트 출력
const RadarChart = () => {
  const processedData = Object.keys(domains).map((key) => {
    return { key, value: radarData[0][key] / domains[key][1] };
  });

  return (
    <View style={analysisStyle.container}>
      <Text style={analysisStyle.squad.headerFont.title}>스탯</Text>
      <View style={chartStyle.container}>
        <VictoryChart
          polar
          theme={VictoryTheme.material}
          domain={{ y: [0, 1] }}
        >
          {Object.keys(domains).map((key, i) => {
            return (
              <VictoryPolarAxis
                key={`polar-axis-${key}`}
                dependentAxis
                style={chartStyle.axisStyle}
                tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
                labelPlacement="perpendicular"
                axisValue={i + 1}
                label={key}
                tickFormat={(t) => Math.ceil(t * domains[key][1])}
              />
            );
          })}
          <VictoryArea
            data={processedData}
            x="key"
            y="value"
            style={chartStyle.areaStyle}
            // 성능 개선을 위해 애니메이션 속성 제거
            // animate={{
            //   duration: 500,
            //   onLoad: { duration: 500 },
            // }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default RadarChart;
