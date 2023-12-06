import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const App = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [players, setPlayers] = useState([]);
  const [playersByPosition, setPlayersByPosition] = useState({});

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("http://10.20.103.60:5002/teams/england");
      const result = await response.json();
      setTeams(result);
    } catch (error) {
      Alert.alert("Error", "Failed to load teams.");
    }
  };

  const categorizePlayersByPosition = (players) => {
    const categorized = {
      Forwards: [],
      Midfielders: [],
      Defenders: [],
      Goalkeepers: [],
    };

    players.forEach((player) => {
      switch (player.role_name) {
        case "Forward":
          categorized.Forwards.push(player);
          break;
        case "Midfielder":
          categorized.Midfielders.push(player);
          break;
        case "Defender":
          categorized.Defenders.push(player);
          break;
        case "Goalkeeper":
          categorized.Goalkeepers.push(player);
          break;
        default:
          break;
      }
    });

    return categorized;
  };

  const handlePress = async () => {
    if (selectedTeamId) {
      try {
        const response = await fetch("http://0.0.0.0:5000/get-team-players", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamId: selectedTeamId }),
        });

        if (response.ok) {
          const playersData = await response.json();
          setPlayers(playersData);
          setPlayersByPosition(categorizePlayersByPosition(playersData));
        } else {
          Alert.alert("Error", "Server responded with an error.");
        }
      } catch (error) {
        Alert.alert("Error", "Network error occurred.");
      }
    } else {
      Alert.alert("Error", "Please select a team.");
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedTeamId}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedTeamId(itemValue)}
      >
        <Picker.Item label="Select a Team" value="" />
        {teams.map((team) => (
          <Picker.Item key={team.wyid} label={team.name} value={team.wyid} />
        ))}
      </Picker>
      <Button title="Get Team Players" onPress={handlePress} />
      <ScrollView style={styles.scrollView}>
        {Object.keys(playersByPosition).map((position) => (
          <View key={position}>
            <Text style={styles.positionHeader}>{position}</Text>
            {playersByPosition[position].map((player) => (
              <View key={player.wyid} style={styles.playerCard}>
                <Text style={styles.playerName}>
                  {player.firstname} {player.lastname}
                </Text>
                <Text>Team ID: {player.currentteamid}</Text>
                <Text>Position: {player.role_name}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  scrollView: {
    width: "100%",
  },
  playerCard: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  playerName: {
    fontWeight: "bold",
  },
  positionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default App;
