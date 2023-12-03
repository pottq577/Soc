// weekDates를 저장하고 관리할 새로운 Context 생성
import React, { createContext, useState, useContext } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가

  return (
    <DateContext.Provider
      value={{ weekDates, setWeekDates, selectedDate, setSelectedDate }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);
