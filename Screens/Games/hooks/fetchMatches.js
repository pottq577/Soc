import { useState, useEffect } from "react";

const useFetchMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://10.20.102.165:5002/matches");
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
