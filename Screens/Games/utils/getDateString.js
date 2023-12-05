// 날짜만 추출하는 함수
const getDateString = (datetime) => {
  return datetime.split("T")[0]; // 'YYYY-MM-DD' 형식으로 변환
};

export default getDateString;
