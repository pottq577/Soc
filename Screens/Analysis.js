import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Picker } from "@react-native-picker/picker";
import {
  styles,
  switchStyle,
  seasonStyle,
  cardStyle,
} from "../Styles/analysisStyles";

const Separator = () => <View style={styles.separator} />;
const seasons = ["2023/24", "2022/23", "2021/22", "2020/21", "2019/20"];

// 예시 데이터
const playersData = [
  {
    rank: 1,
    name: "77ㅓ억",
    score: 77,
    image: require("../constants/77.jpeg"),
    team: require("../constants/arsenal.png"),
    teamName: "arsenal",
  },
  {
    rank: 2,
    name: "77ㅓ억",
    score: 77,
    image: require("../constants/77.jpeg"),
    team: require("../constants/arsenal.png"),
    teamName: "arsenal",
  },
];

const teamData = {
  rank: 1,
  name: "4스날",
  score: 44,
  image: require("../constants/arsenal.png"),
};

export default function AnalysisScreen() {
  const [isPlayerSelected, setIsPlayerSelected] = React.useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("2019/20");

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderCardContent = (isPlayerSelected) => {
    if (selectedSeason !== "2019/20") return noContentView(); // 2019/20 이외
    return cardView(isPlayerSelected);
  };

  const noContentView = () => {
    return (
      <View>
        <Text>No Data</Text>
      </View>
    );
  };

  const cardView = (index) => {
    let data;
    if (index === 0) {
      data = playersData; // 선수 데이터
    } else {
      data = teamData; // 팀 데이터
    }

    return (
      <View style={cardStyle.container}>
        {/* 헤드 텍스트 */}
        <Text style={cardStyle.headText}>Goals</Text>
        {/* 정보 출력 뷰 */}
        <View style={cardStyle.cardContainer}>
          {/* 1st */}
          <View style={cardStyle.first}>
            {/* 내용 텍스트 */}
            <View style={{ justifyContent: "space-around" }}>
              <Text>{data[0].rank}</Text>
              <Text style={cardStyle.nameText}>{data[0].name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={data[0].team}
                />
                <Text
                  style={{ fontSize: 20, marginLeft: 5, fontWeight: "200" }}
                >
                  {data[0].teamName}
                </Text>
              </View>
              <Text style={cardStyle.scoreText}>{data[0].score}</Text>
            </View>
            {/* 정보에 해당하는 이미지 */}
            <Image style={{ width: 180, height: 180 }} source={data[0].image} />
          </View>
          {/* 2nd, 3rd */}
          <View>
            <View style={{ padding: 10, flexDirection: "row" }}>
              <Text>2nd</Text>
              <Text>2nd name</Text>
            </View>

            <Separator />

            <View style={{ padding: 10, flexDirection: "row" }}>
              <Text>3nd</Text>
              <Text>3nd name</Text>
            </View>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: 40,
                backgroundColor: "pink",
                margin: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>View Full List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 선수 / 팀 선택 뷰 */}
      <SegmentedControlTab
        values={["선수", "팀"]}
        selectedIndex={isPlayerSelected}
        onTabPress={setIsPlayerSelected}
        tabsContainerStyle={switchStyle.tabsContainer}
        tabStyle={switchStyle.tabs}
        activeTabStyle={switchStyle.activeTab}
        tabTextStyle={switchStyle.tabText}
        activeTabTextStyle={switchStyle.activeTabText}
      />

      <Separator />

      {/* 시즌 선택 뷰 */}
      <View style={seasonStyle.container}>
        <TouchableOpacity style={seasonStyle.button} onPress={toggleMenu}>
          <Text>{selectedSeason}</Text>
        </TouchableOpacity>
        {menuVisible && (
          <View style={seasonStyle.modalView}>
            <Picker
              selectedValue={selectedSeason}
              onValueChange={(itemValue) => {
                setSelectedSeason(itemValue);
                setMenuVisible(false);
              }}
            >
              {seasons.map((season, index) => (
                <Picker.Item key={index} label={season} value={season} />
              ))}
            </Picker>
          </View>
        )}
      </View>

      <Separator />

      {/* 카드 뷰 */}
      <View>{renderCardContent(isPlayerSelected)}</View>
    </ScrollView>
  );
}
