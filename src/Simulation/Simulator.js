import React, { useState } from 'react';
import { View, Button, ScrollView, Text, TextInput, StyleSheet } from 'react-native';

const PythonRunner = () => {
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [matchId, setMatchId] = useState('');

    const runPythonScript = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://119.204.24.238:5000/match_player_stats/${matchId}`);
            const data = await response.json();
            if (data.data) {
                const parsedData = JSON.parse(data.data);
                // 먼저 팀 이름으로 정렬하고, 그 다음에 total_passes로 내림차순 정렬합니다.
                const sortedData = parsedData.sort((a, b) => {
                    if (a.team_name < b.team_name) return -1;
                    if (a.team_name > b.team_name) return 1;
                    return b.total_passes - a.total_passes;
                });
                setOutput(sortedData);
            } else {
                throw new Error('No output from server');
            }
        } catch (error) {
            console.error(error);
            setOutput(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const renderTableHeader = () => {
        const headers = output.length > 0 ? Object.keys(output[0]) : [];
        return (
            <View style={styles.tableRowHeader}>
                {headers.map(header => (
                    <Text style={styles.tableHeaderCell} key={header}>{header}</Text>
                ))}
            </View>
        );
    };

    const renderTableRows = () => {
        return output.map((row, index) => (
            <View key={index} style={styles.tableRow}>
                {Object.values(row).map((cell, cellIndex) => (
                    <Text style={styles.tableCell} key={cellIndex}>{cell}</Text>
                ))}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setMatchId}
                value={matchId}
                placeholder="Enter Match ID"
                keyboardType="numeric"
            />
            <Button title="Run Python Script" onPress={runPythonScript} disabled={isLoading} />
            <ScrollView style={styles.outputContainer}>
                {isLoading ? <Text>Loading...</Text> : (
                    <>
                        {renderTableHeader()}
                        {renderTableRows()}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    outputContainer: {
        marginTop: 20,
        width: '100%',
    },
    tableRowHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        padding: 5,
    },
    tableHeaderCell: {
        minWidth: 100, // 각 헤더 셀의 최소 너비
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 5,
        marginRight: 5,
    },
    tableCell: {
        minWidth: 100, // 각 데이터 셀의 최소 너비
        textAlign: 'left',
        padding: 5,
        marginRight: 5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
});

export default PythonRunner;
