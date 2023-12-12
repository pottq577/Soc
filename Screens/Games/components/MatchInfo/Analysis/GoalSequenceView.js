import React, { useState, useEffect } from "react";
import { View, Image, Text, FlatList } from "react-native";
import {
  POSTGRES_SERVER_ADDRESS,
  SCREEN_WIDTH,
} from "../../../constants/constants";

const GoalSequenceView = ({ match_id }) => {
  const [goalSequences, setGoalSequences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goalSequenceResponse = await fetch(
          `${POSTGRES_SERVER_ADDRESS}/get_goal_sequences/${match_id}`
        );
        if (!goalSequenceResponse.ok) {
          throw new Error(`HTTP error! status: ${goalSequenceResponse.status}`);
        }

        if (goalSequenceResponse.status === 200) {
          const goalSequenceData = await goalSequenceResponse.json();
          // 이미지 경로 배열 확인 후 설정
          const images = Array.isArray(goalSequenceData.images)
            ? goalSequenceData.images
            : [];
          setGoalSequences(images);
        } else {
          console.error("No goal sequences found.");
          setGoalSequences([]); // 골 시퀀스가 없는 경우 빈 배열 설정
        }
      } catch (error) {
        console.error("데이터 가져오기 중 문제 발생:", error.message);
        setGoalSequences([]); // 오류 발생 시 빈 배열 설정
      }
    };

    fetchData();
  }, [match_id]);

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: `${POSTGRES_SERVER_ADDRESS}/${item}` }}
      style={{
        width: SCREEN_WIDTH / 1.17,
        height: 240,
        resizeMode: "contain",
        marginRight: 10,
      }}
      onError={(e) => console.log("Error loading image:", e)}
    />
  );

  const getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH / 1.17,
    offset: SCREEN_WIDTH * index,
    index,
  });

  const renderGoalSequences = () => (
    <View>
      {goalSequences.length === 0 ? (
        <View style={{ padding: 30, alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            해당 경기는 득점이 발생하지 않았습니다.
          </Text>
        </View>
      ) : (
        <FlatList
          data={goalSequences}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          getItemLayout={getItemLayout}
        />
      )}
    </View>
  );

  return <View>{renderGoalSequences()}</View>;
};

export default GoalSequenceView;
