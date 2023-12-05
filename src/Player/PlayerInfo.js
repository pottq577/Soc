import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://119.204.24.238:5000:5000/teams');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  // FlatList의 항목을 렌더링하는 함수
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.officialname}</Text>
      <Text style={styles.cell}>{item.area_name}</Text>
      <Text style={styles.cell}>{item.city}</Text>
      <Text style={styles.cell}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Load Data" onPress={fetchData} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.wyid.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50,
  },
  list: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  cell: {
    marginRight: 10,
    flex: 1, // 각 셀이 동일한 공간을 차지하도록 설정
  },
});
