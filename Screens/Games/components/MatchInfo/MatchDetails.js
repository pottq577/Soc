import React from "react";
import { Text, View } from "react-native";
import { analysisStyle, overviewStyle } from "../../constants/constants";

const MatchDetailCard = ({ label, homeData, awayData }) => {
  // 숫자로 변환 (점수, 퍼센티지 등)
  const homeDataNumber = parseFloat(homeData);
  const awayDataNumber = parseFloat(awayData);

  // 홈 데이터가 어웨이 데이터보다 큰지 여부
  const isHomeHigher = homeDataNumber > awayDataNumber;
  const isDataEqual = homeDataNumber === awayDataNumber;

  // 강조 스타일
  const emphasizedStyle = { fontWeight: "bold", color: "blue" };

  return (
    <View style={overviewStyle.timeline.eventRow}>
      <Text
        style={[
          overviewStyle.timeline.event,
          isHomeHigher && !isDataEqual ? emphasizedStyle : {},
        ]}
      >
        {homeData}
      </Text>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={overviewStyle.timeline.time}>{label}</Text>
      </View>
      <Text
        style={[
          overviewStyle.timeline.event,
          !isHomeHigher && !isDataEqual ? emphasizedStyle : {},
        ]}
      >
        {awayData}
      </Text>
    </View>
  );
};

const MatchDetails = ({ matchDetails }) => {
  return (
    <View style={analysisStyle.container}>
      <Text style={analysisStyle.header}>경기 세부 정보</Text>
      {matchDetails.map((detail, index) => (
        <MatchDetailCard
          key={index}
          label={detail.label}
          homeData={detail.homeData}
          awayData={detail.awayData}
        />
      ))}
    </View>
  );
};

export default MatchDetails;
