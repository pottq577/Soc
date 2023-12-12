import { useState, useEffect } from "react";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/config";

const useFetchLeagueRank = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeagueRank = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await fetch(`${POSTGRES_SERVER_ADDRESS}/TeamRank`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setIsLoading(false); // 로딩 완료
    };

    fetchLeagueRank();
  }, []);

  return { teams, isLoading };
};

export default useFetchLeagueRank;
