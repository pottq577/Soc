import { View } from "react-native";
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import { domains, data, analysisStyle } from "../constants/constants";

const RadarChart = () => {
  const processedData = Object.keys(domains).map((key) => {
    return { key, value: data[0][key] };
  });

  return (
    <View style={analysisStyle.container}>
      <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
        {Object.keys(domains).map((key, i) => {
          return (
            <VictoryPolarAxis
              key={i}
              dependentAxis
              style={{
                axisLabel: { padding: 30 },
                axis: { stroke: "none" },
                grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
              }}
              tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
              labelPlacement="perpendicular"
              axisValue={i + 1}
              label={key}
              tickFormat={(t) => Math.ceil(t * domains[key][1])}
              tickValues={[1, 5, 6, 10]}
            />
          );
        })}
        {Object.keys(domains).map((key, i) => {
          return (
            <VictoryPolarAxis
              key={i}
              style={{
                axisLabel: { padding: 1 },
                axis: { stroke: "none" },
                grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
              }}
              labelPlacement="parallel"
              axisValue={i + 1}
              label={key}
              tickFormat={() => ""}
            />
          );
        })}
        <VictoryArea
          polar
          data={processedData}
          x="key"
          y={(d) => d.value / 100}
          style={{
            data: {
              fill: "tomato",
              fillOpacity: 0.7,
              stroke: "tomato",
              strokeWidth: 1,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default RadarChart;
