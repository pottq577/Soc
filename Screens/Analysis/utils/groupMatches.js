// 날짜 데이터에서 월을 추출하여 그룹화
const groupMatchesByMonth = (matches) => {
  const groupedMatches = {};

  matches.forEach((match) => {
    const month = new Date(match.date).getMonth() + 1; // 월을 추출 (1월이 0이므로 +1)
    if (!groupedMatches[month]) {
      groupedMatches[month] = [];
    }
    groupedMatches[month].push(match);
  });

  return groupedMatches;
};

export default groupMatchesByMonth;
