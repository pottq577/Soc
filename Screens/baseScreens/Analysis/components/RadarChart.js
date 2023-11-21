import { View } from "react-native";
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import { domains, data, chartStyle } from "../constants/constants";

const RadarChart = () => {
  const processedData = Object.keys(domains).map((key) => {
    return { key, value: data[0][key] / domains[key][1] };
  });

  return (
    <View style={chartStyle.container}>
      <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
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
          animate={{
            duration: 500,
            onLoad: { duration: 500 },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default RadarChart;
