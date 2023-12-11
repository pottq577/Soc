import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import RenderSquad from "./RenderSquad";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/constants";

const MatchLineUp = ({
  match_id,
  team1Name,
  team2Name,
  team1_name,
  team1_goals,
  team2_name,
  team2_goals,
  datetime,
  homeLogo,
  awayLogo,
}) => {
  const [homeLineup, setHomeLineup] = useState([]);
  const [awayLineup, setAwayLineup] = useState([]);

  useEffect(() => {
    const fetchLineups = async () => {
      try {
        // 홈 팀 라인업 가져오기
        const homeResponse = await fetch(
          `${POSTGRES_SERVER_ADDRESS}/matchAnalysisData/${match_id}/${team1Name}`
        );
        const homeData = await homeResponse.json();
        setHomeLineup(homeData);
        // console.log("Home Lineup:", homeData); // 홈 팀 라인업 로깅

        // 어웨이 팀 라인업 가져오기
        const awayResponse = await fetch(
          `${POSTGRES_SERVER_ADDRESS}/matchAnalysisData/${match_id}/${team2Name}`
        );
        const awayData = await awayResponse.json();
        setAwayLineup(awayData);
        // console.log("Away Lineup:", awayData); // 어웨이 팀 라인업 로깅
      } catch (error) {
        console.error("Error fetching lineups:", error);
      }
    };

    fetchLineups();
  }, [match_id]);

  // TODO RenderSquad에서 실제 팀의 스쿼드 라인업을 출력할 것
  // 탭에 따른 컨텐츠 렌더링
  const renderTabContent = () => {
    return (
      <RenderSquad
        match_id={match_id}
        homeLineup={homeLineup}
        awayLineup={awayLineup}
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
    );
  };

  return <ScrollView>{renderTabContent()}</ScrollView>;
};

export default MatchLineUp;
