import { useState, useEffect } from "react";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/config";

const useFetchLeagueRank = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchLeagueRank = async () => {
      try {
        const response = await fetch(`${POSTGRES_SERVER_ADDRESS}/TeamRank`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchLeagueRank();
  }, []);

  return teams;
};

export default useFetchLeagueRank;
