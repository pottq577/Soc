// weekDates를 저장하고 관리할 새로운 Context 생성
import React, { createContext, useState, useContext } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [weekDates, setWeekDates] = useState([]);

  return (
    <DateContext.Provider value={{ weekDates, setWeekDates }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);
