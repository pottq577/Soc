import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { analysisStyle } from "../../../constants/constants";
import MatchTimeLine from "./MatchTimeLine";
import MatchDetails from "./MatchDetails";
import MatchLineUp from "./MatchLineUp";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/constants";

const MatchOverview = ({
  match_id,
  matchDetails,
  selectedTabIndex,
  team1_name,
  team1_goals,
  team2_name,
  team2_goals,
  datetime,
  homeLogo,
  awayLogo,
}) => {
  const [matchEvents, setMatchEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await fetch(
          `${POSTGRES_SERVER_ADDRESS}/match_events/${match_id}`
        );
        const data = await response.json();

        const combinedEvents = [
          ...data.goals,
          ...data.yellow_cards.filter((event) =>
            event.tags.includes("Yellow card")
          ),
          ...data.red_cards.filter((event) => event.tags.includes("Red card")),
        ].sort((a, b) => a.time - b.time);

        setMatchEvents(combinedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setIsLoading(false); // 로딩 완료
    };

    fetchEvents();
  }, [match_id]);

  return (
    <View style={{ padding: 10 }}>
      {/* 타임라인 카드 */}
      <View style={analysisStyle.container}>
        <Text style={analysisStyle.header}>타임라인</Text>
        {isLoading ? (
          <View style={{ padding: 100 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View>
            {matchEvents.map((event, index) => (
              <MatchTimeLine
                key={index}
                event={event}
                team1Name={matchDetails.team1_name}
                team2Name={matchDetails.team2_name}
              />
            ))}
          </View>
        )}
      </View>
      {/* 경기 세부 정보 카드 */}
      {/* <MatchDetails matchDetails={matchDetails} /> */}
      {/* 경기 라인 업 카드 */}
      {isLoading ? (
        <View style={{ padding: 100 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <MatchLineUp
          match_id={match_id}
          team1Name={matchDetails.team1_name}
          team2Name={matchDetails.team2_name}
          {...{
            team1_name,
            team1_goals,
            team2_name,
            team2_goals,
            datetime,
            homeLogo,
            awayLogo,
          }}
        />
      )}
    </View>
  );
};

export default MatchOverview;
