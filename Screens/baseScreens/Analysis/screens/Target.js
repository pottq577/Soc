import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { listStyle, switchStyle, analysisStyle } from "../constants/constants";
import { useAnalysis } from "../hooks/useAnalysis";

const positionColors = {
  FW: "#bc0f0f",
  MF: "#469719",
  DF: "#468cff",
  GK: "#ffae44",
};

const overviewData = {
  Nationality: {
    label: "Chile",
    image: require("../../../../constants/Chile.png"),
  },
  Birth: "21/07/2000",
  Age: 23,
  Club: {
    label: "Arsenal",
    image: require("../../../../constants/arsenal.png"),
  },
  Position: {
    label: "MF",
  },
};

const recordData = {
  Appearances: 77,
  Goals: 30,
  Assists: 10,
};

const statData = {
  Attack: {
    Goals: 77,
    Shots: 10,
  },
  Team_Play: {
    Assists: 3,
    Passes: 30,
  },
};

const Target = ({ route }) => {
  const { item, isPlayer } = route.params;
  const {
    state: { isOverviewSelected },
    setIsOverviewSelected,
  } = useAnalysis(); // Custom Hook 사용

  // 개별 정보를 보여주는 컴포넌트
  const InfoRow = ({ label, value }) => {
    const textStyle =
      label === "Position" ? { color: positionColors[value.label] } : {};

    // value가 객체이면 이미지와 레이블을 모두 표시합니다.
    const content =
      typeof value === "object" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {value.image && (
            <Image
              source={value.image}
              style={{ width: 30, height: 15, marginRight: 10 }}
            />
          )}
          <Text style={[analysisStyle.content.subject.detail, textStyle]}>
            {value.label}
          </Text>
        </View>
      ) : (
        <Text style={[analysisStyle.content.subject.detail, textStyle]}>
          {value}
        </Text>
      );
    return (
      <View style={analysisStyle.content.container}>
        <Text style={analysisStyle.content.subject.title}>{label}</Text>
        {content}
      </View>
    );
  };

  // 섹션 컴포넌트 (예: 선수 정보, 공격, 팀 플레이 등)
  const Section = ({ sectionTitle, data }) => (
    <View style={analysisStyle.container}>
      <Text style={analysisStyle.header}>{sectionTitle}</Text>
      {Object.entries(data).map(([key, value]) => (
        <InfoRow key={key} label={key} value={value} />
      ))}
    </View>
  );

  const OverviewView = () => (
    <View style={{ padding: 10 }}>
      <Section sectionTitle="선수정보" data={overviewData} />
      <Section sectionTitle="프리미어 리그 기록" data={recordData} />
    </View>
  );

  const AnalysisView = () => (
    <View style={{ padding: 10 }}>
      <Section sectionTitle="공격" data={statData.Attack} />
      <Section sectionTitle="팀 플레이" data={statData.Team_Play} />
    </View>
  );

  const renderContentView = () => {
    return isOverviewSelected ? <OverviewView /> : <AnalysisView />;
  };

  return (
    <ScrollView>
      {/* 선수 정보 헤더 */}
      <View style={{ ...listStyle.card.container, marginHorizontal: 10 }}>
        <View style={listStyle.card.text.container}>
          <Text style={listStyle.card.text.name}>{item.name}</Text>
          {/* 선수 목록일 때만 팀 로고, 팀명 출력 */}
          {!isPlayer && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={listStyle.card.image.teamIcon} source={item.team} />
              <Text style={listStyle.card.text.teamName}>{item.teamName}</Text>
            </View>
          )}
          {/* TODO 등번호로 교체 */}
          <Text style={listStyle.card.text.score}>등번호</Text>
        </View>
        <Image style={listStyle.card.image.photo} source={item.image} />
      </View>
      {/* 개요 / 분석 선택 탭 */}
      <View style={{ height: 60, width: "100%" }}>
        <SegmentedControlTab
          values={["개요", "스탯"]}
          selectedIndex={isOverviewSelected ? 0 : 1}
          onTabPress={(index) => setIsOverviewSelected(index === 0)}
          tabsContainerStyle={switchStyle.tabsContainer}
          tabStyle={switchStyle.tabs}
          activeTabStyle={switchStyle.activeTab}
          tabTextStyle={switchStyle.tabText}
          activeTabTextStyle={switchStyle.activeTabText}
        />
      </View>
      <View>{renderContentView()}</View>
    </ScrollView>
  );
};

export default Target;
