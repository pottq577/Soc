import { useState, useEffect } from "react";

const useFetchLeagueRank = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchLeagueRank = async () => {
      try {
        const response = await fetch("http://10.20.102.165:5002/TeamRank");
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
