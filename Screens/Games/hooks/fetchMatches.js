import { useState, useEffect } from "react";
import { POSTGRES_SERVER_ADDRESS } from "../../../constants/config";

const useFetchMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${POSTGRES_SERVER_ADDRESS}/matches`);
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMatches();
  }, []);

  return matches;
};

export default useFetchMatches;