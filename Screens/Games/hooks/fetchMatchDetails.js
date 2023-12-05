import { useState, useEffect } from "react";

const fetchMatchDetails = (matchId) => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(
          `http://10.20.102.165:5002/match/${matchId}`
        );
        const data = await response.json();
        setMatchDetails(data);
      } catch (error) {
        console.error("Error fetching match details: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  return { matchDetails, isLoading };
};

export default fetchMatchDetails;
