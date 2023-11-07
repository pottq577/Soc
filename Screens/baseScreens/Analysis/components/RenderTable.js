import React from "react";
import { View, Text, Image } from "react-native";
import { listStyle } from "../constants/constants";

const CommonHeader = ({ titles }) => {
  return (
    <View style={listStyle.table.header.container}>
      {titles.map((title, index) => (
        <Text
          key={index}
          style={[listStyle.table.header.cell, { flex: title.flex }]}
        >
          {title.text}
        </Text>
      ))}
    </View>
  );
};

export const TableHeader = ({ isPlayer }) => {
  const titles = isPlayer
    ? [
        { text: "등수", flex: 1 },
        { text: "팀명", flex: 4 },
        { text: "득점수", flex: 1 },
      ]
    : [
        { text: "등수", flex: 1 },
        { text: "선수명", flex: 4 },
        { text: "팀", flex: 2 },
        { text: "득점수", flex: 1 },
      ];

  return <CommonHeader titles={titles} />;
};

const CommonRow = ({ item, isPlayer }) => {
  return (
    <View style={listStyle.table.row.container}>
      <Text style={[listStyle.table.row.cell, { flex: 1 }]}>{item.rank}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", flex: 4 }}>
        {/* 팀 목록일 때 팀 로고 출력 */}
        {isPlayer && (
          <Image style={listStyle.table.row.image} source={item.image} />
        )}
        <Text style={[listStyle.table.row.cell, { flex: 4 }]}>{item.name}</Text>
      </View>

      {/* 선수 목록일 때 팀 로고 출력 */}
      {!isPlayer && (
        <View style={[listStyle.table.row.cell, { flex: 2 }]}>
          <Image style={listStyle.table.row.image} source={item.team} />
        </View>
      )}
      <Text style={[listStyle.table.row.cell, { flex: 1 }]}>{item.score}</Text>
    </View>
  );
};

export const TableRow = ({ item, isPlayer }) => {
  return <CommonRow item={item} isPlayer={isPlayer} />;
};

export const renderTableItem = ({ item, isPlayer }) => {
  if (item.isRankOne) {
    return (
      <View style={listStyle.container}>
        <View style={listStyle.card.container}>
          <View style={listStyle.card.text.container}>
            <Text style={listStyle.card.text.rank}>{item.rank}</Text>
            <Text style={listStyle.card.text.name}>{item.name}</Text>
            {/* 선수 목록일 때만 팀 로고, 팀명 출력 */}
            {!isPlayer && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={listStyle.card.image.teamIcon}
                  source={item.team}
                />
                <Text style={listStyle.card.text.teamName}>
                  {item.teamName}
                </Text>
              </View>
            )}
            <Text style={listStyle.card.text.score}>{item.score}</Text>
          </View>
          <Image style={listStyle.card.image.photo} source={item.image} />
        </View>
      </View>
    );
  } else if (item.isHeader) {
    return <TableHeader isPlayer={isPlayer} />;
  } else {
    return <TableRow item={item} isPlayer={isPlayer} />;
  }
};
