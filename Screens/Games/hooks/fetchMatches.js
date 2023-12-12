import { useState, useEffect } from "react";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/config";

const useFetchMatches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${POSTGRES_SERVER_ADDRESS}/matches`);
        const data = await response.json();
        // console.log("Server response:", data); // 서버 응답 로깅
        setMatches(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setIsLoading(false);
    };

    fetchMatches();
  }, []);

  return { matches, isLoading };
};

export default useFetchMatches;
