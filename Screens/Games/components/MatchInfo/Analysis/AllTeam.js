const initialLayout = { width: Dimensions.get("window").width };
//===================================================================================================
const AllTeam = ({ matchId, team1Name, team2Name }) => {
  const navigation = useNavigation();
  const [matchDetails, setMatchDetails] = useState({
    events: [],
    substitutions: [],
    match_info: {},
  });

  const [homeLineup, setHomeLineup] = useState([]);
  const [awayLineup, setAwayLineup] = useState([]);
  //===============
  const [goalSequences, setGoalSequences] = useState([]);
  //===============
  console.log(team2Name, team2Name);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(home + `/match_events/${matchId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const combinedEvents = [
          ...data.goals,
          ...data.own_goals,
          ...data.red_cards,
          ...data.yellow_cards,
        ].sort((a, b) => a.time - b.time);
        setMatchDetails({
          ...data,
          events: combinedEvents,
          substitutions: data.substitutions,
        });

        if (data.match_info) {
          const { team1_name, team2_name } = data.match_info;

          const homeLineupResponse = await fetch(
            home + `/matchAnalysisData/${matchId}/${team1Name}`
          );
          const awayLineupResponse = await fetch(
            home + `/matchAnalysisData/${matchId}/${team2Name}`
          );

          if (!homeLineupResponse.ok || !awayLineupResponse.ok) {
            throw new Error("Failed to fetch lineups");
          }

          const homeLineupData = await homeLineupResponse.json();
          const awayLineupData = await awayLineupResponse.json();
          // homeLineupData를 콘솔에 로깅
          console.log("Home Lineup Data:", homeLineupResponse);
          console.log(homeLineupData.players_info);
          setHomeLineup(homeLineupData.players_info);
          setAwayLineup(awayLineupData.players_info);
        }
        // 골 시퀀스 이미지 경로 가져오기========================================
        const goalSequenceResponse = await fetch(
          home + `/get_goal_sequences/${matchId}`
        );
        if (!goalSequenceResponse.ok) {
          throw new Error(`HTTP error! status: ${goalSequenceResponse.status}`);
        }

        // HTTP 응답이 OK일 때만 이미지 경로 처리
        if (goalSequenceResponse.status === 200) {
          const goalSequenceData = await goalSequenceResponse.json();
          const images = goalSequenceData.images; // 이미지 경로 배열
          setGoalSequences(images); // 여러 개의 이미지 경로를 설정
          console.log(goalSequences.map((imagePath, index)));
        } else {
          // 골 시퀀스 이미지가 없는 경우, 에러를 처리하거나 메시지를 표시할 수 있음
          // 여기에서는 console.log를 사용하여 로그에 에러 메시지를 출력
          console.log("No goal sequences found.");
        }
        //=====================================================================
      } catch (error) {
        console.error("데이터 가져오기 중 문제 발생:", error.message);
      }
    };

    fetchData();
  }, [matchId, team1Name, team2Name]);

  // 라인업을 표시하는 함수
  const renderLineup = (lineup, title, matchId, teamName) => (
    <View style={styles.lineupContainer}>
      <Text style={styles.lineupTitle}>{title}</Text>
      {lineup.map((player) => (
        <TouchableOpacity
          key={player.wyid}
          onPress={() => handlePlayerPress(player, matchId, teamName)}
        >
          <Text style={styles.playerName}>
            {player.shortname} ({player.role_code2})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handlePlayerPress = (player, matchId, teamName) => {
    console.log("Selected Player:", player);
    console.log("Match ID:", matchId);
    console.log("teamName:", teamName);
    navigation.navigate("PlayerInformation", { player, matchId, teamName });
  };

  // 라벨에서 팀 이름 추출
  const labelParts = matchDetails.match_info.label
    ? matchDetails.match_info.label.split(" - ")
    : ["", ""];
  const homeTeam = labelParts[0].split(" vs ")[0];
  const awayTeam = labelParts[1] ? labelParts[1].split(",")[0] : "";
  console.log(matchDetails.match_info.label);

  const renderEvents = (team) => (
    <View style={styles.teamColumn}>
      <Text>경기 기록</Text>
      {matchDetails.events.map((event, index) => {
        if (event.team_name === team) {
          let eventStyle = styles.eventText; // 기본 스타일
          const eventType = event.tags[0]; // 이벤트 타입 (예: Goal, Yellow card, Red card)

          if (eventType === "Goal") {
            eventStyle = { ...styles.eventText, color: "blue" }; // 골은 초록색
          } else if (eventType === "Own goal") {
            eventStyle = { ...styles.eventText, color: "pink" }; // 옐로 카드는 노란색
          } else if (eventType === "Yellow card") {
            eventStyle = { ...styles.eventText, color: "yellow" }; // 옐로 카드는 노란색
          } else if (eventType === "Red card") {
            eventStyle = { ...styles.eventText, color: "red" }; // 레드 카드는 빨간색
          }

          return (
            <Text key={index} style={eventStyle}>
              {event.player_name} - {Math.floor(event.time / 60)}'
            </Text>
          );
        }
        return null;
      })}
    </View>
  );
  const renderSubstitutions = (team) => (
    <View style={styles.substitutionContainer}>
      <Text style={styles.sectionTitle}>{team} Substitutions</Text>
      {matchDetails.substitutions.map((substitution, index) => {
        if (substitution.team_name === team) {
          // 교체 이벤트 유형에 따른 스타일 결정
          const substitutionStyle =
            substitution.sub_event_type === "Player in"
              ? { ...styles.substitutionText, color: "blue" } // 'Player in'은 파란색
              : { ...styles.substitutionText, color: "red" }; // 'Player out'은 빨간색

          return (
            <Text key={index} style={substitutionStyle}>
              {substitution.sub_event_type === "Player in" ? "In: " : "Out: "}
              {substitution.player_name} ({Math.floor(substitution.time / 60)}')
            </Text>
          );
        }
        return null;
      })}
    </View>
  );

  // 골 시퀀스 이미지 렌더링 함수
  const renderGoalSequences = () => (
    <View style={styles.goalSequenceContainer}>
      {goalSequences.length === 0 ? (
        <Text>No goals</Text> // 골이 없는 경우 텍스트를 반환
      ) : (
        goalSequences.map((imagePath, index) => (
          <View key={index}>
            <Text>{index}</Text> {/* 이미지 위에 번호를 표시 */}
            <Image
              source={{ uri: home + imagePath }} // 수정: 서버 주소와 정적 파일 경로를 결합
              style={styles.goalSequenceImage} // 이미지 스타일 적용
              onError={(e) => console.log("Error loading image:", e)}
            />
          </View>
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>ID: {matchId}</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.teamTitle}>{team1Name}</Text>

          {renderEvents(homeTeam)}
          {renderLineup(
            homeLineup,
            "홈팀 라인업",
            matchId,
            team1Name,
            labelParts
          )}
          {renderSubstitutions(homeTeam)}
        </View>
        <View style={styles.column}>
          <Text style={styles.teamTitle}>{team2Name}</Text>

          {renderEvents(awayTeam)}
          {renderLineup(awayLineup, "어웨이팀 라인업", matchId, team2Name)}
          {renderSubstitutions(awayTeam)}
        </View>
      </View>
      {renderGoalSequences()}
    </View>
  );
};
