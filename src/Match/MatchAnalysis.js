import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const AllTeam = ({ matchDetails, matchId }) => {
    return (
        <View style={styles.teamContainer}>
            {matchDetails && (
                <>
                    <Text>ID: {matchId}</Text>
                    <Text style={styles.teamTitle}>홈 팀: {matchDetails.team1_name}</Text>
                    <Text>팀 ID: {matchDetails.team1_id}</Text>
                    {/* 홈 팀 추가 정보 */}

                    <Text style={styles.teamTitle}>어웨이 팀: {matchDetails.team2_name}</Text>
                    <Text>팀 ID: {matchDetails.team2_id}</Text>
                    {/* 어웨이 팀 추가 정보 */}
                </>
            )}
        </View>
    );
}; 
const HomeTeam = ({ matchDetails, matchId }) => {
    //const [imageUrl, setImageUrl] = useState(null);
    const [imageData, setImageData] = useState(null);
    // useEffect(() => {
    //     if (matchDetails) {
    //         const fetchMatchDetails = async () => {
    //             try {
    //                 const response = await fetch(`http://119.204.24.238:5000/matchAnalysis/${matchId}/${matchDetails.team1_name}`);
    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     setImageUrl(data.image_url); // 이미지 URL 설정
    //                 } else {
    //                     console.error('Server responded with an error:', response.status);
    //                 }
    //             } catch (error) {
    //                 console.error('Error fetching image URL:', error);
    //             }
    //         };

    //         fetchMatchDetails();
    //     }
    // }, [matchDetails, matchId]);
    useEffect(() => {
        if (matchDetails) {
            fetch(`http://119.204.24.238:5000/matchAnalysis/${matchId}/${matchDetails.team1_name}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob(); // 이미지 데이터를 blob 형식으로 변환
                })
                .then(blob => {
                    const imageObjectURL = URL.createObjectURL(blob); // blob을 URL로 변환
                    setImageData(imageObjectURL);
                })
                .catch(error => console.error('Error fetching image:', error));
        }
    }, [matchDetails, matchId]);

    
    return (
        <View style={styles.teamContainer}>
            {matchDetails && (
                <>
                    <Text style={styles.teamTitle}>홈 팀: {matchDetails.team1_name}</Text>
                    <Text>팀 ID: {matchDetails.team1_id}</Text>
                    {imageData && (
                        <Image
                            source={{ uri: imageData }}
                            resizeMode="contain" // 여기에 resizeMode를 props로 추가합니다.
                            style={styles.image}
                        />
                    )}

                </>
            )}
        </View>
    );
};



const AwayTeam = ({ matchDetails, matchId }) => {
    const [imageData, setImageData] = useState(null);
    useEffect(() => {
        if (matchDetails) {
            fetch(`http://119.204.24.238:5000/matchAnalysis/${matchId}/${matchDetails.team2_name}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob(); // 이미지 데이터를 blob 형식으로 변환
                })
                .then(blob => {
                    const imageObjectURL = URL.createObjectURL(blob); // blob을 URL로 변환
                    setImageData(imageObjectURL);
                })
                .catch(error => console.error('Error fetching image:', error));
        }
    }, [matchDetails, matchId]);

    
    return (
        <View style={styles.teamContainer}>
            {matchDetails && (
                <>
                    <Text style={styles.teamTitle}>홈 팀: {matchDetails.team2_name}</Text>
                    <Text>팀 ID: {matchDetails.team1_id}</Text>
                    {imageData && (
                        <Image
                            source={{ uri: imageData }}
                            resizeMode="contain" // 여기에 resizeMode를 props로 추가합니다.
                            style={styles.image}
                        />
                    )}

                </>
            )}
        </View>
    );
};

const MatchAnalysis = ({ route }) => {
    const { matchId } = route.params;
    const [matchDetails, setMatchDetails] = useState(null);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'All', title: '전체' },
        { key: 'Home', title: '홈' },
        { key: 'Away', title: '어웨이' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'All':
                return <AllTeam matchDetails={matchDetails} matchId={matchId} />;
            case 'Home':
                return <HomeTeam matchDetails={matchDetails} matchId={matchId} />;
            case 'Away':
                return <AwayTeam matchDetails={matchDetails} matchId={matchId} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        fetch(`http://119.204.24.238:5000/match/${matchId}`)
            .then(response => response.json())
            .then(data => setMatchDetails(data))
            .catch(error => console.error('Error fetching match details: ', error));
    }, [matchId]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: 'white' }}
                    style={{ backgroundColor: '#003366' }}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    teamContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    teamTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    button: {
        backgroundColor: '#003366',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    matchDetails: {
        marginTop: 20,
        alignItems: 'center',
    },
    image: {
        width: 480, // 이미지 크기 조정
        height: 480,    // 이미지 크기 조정
        marginTop: 20,
    },
    // ... 추가 스타일 ...
});

export default MatchAnalysis;
