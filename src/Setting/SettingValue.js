import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingValue() {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://thumb.mtstarnews.com/06/2023/05/2023052417255985870_1.jpg/dims/optimize' }} style={styles.profileImage} />
                <Text style={styles.profileName}>Karina</Text>
                {/* <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow버튼</Text>
                </TouchableOpacity> */}
                <View style={styles.statsContainer}>
                    <Text style={styles.statText}>Followers: 10M</Text>
                    <Text style={styles.statText}>Following: 19</Text>
                </View>
            </View>

            <View style={styles.settingsContainer}>
                <SettingItem icon="crown" title="Become a Pro Member" />
                <SettingItem icon="chart-line" title="My Statistics" />
                <SettingItem icon="friends" title="Invite Friends" />
                <SettingItem icon="help-circle" title="Help" />
            </View>
        </View>
    );
}

function SettingItem({ icon, title }) {
    return (
        <TouchableOpacity style={styles.settingItem}>
            <MaterialCommunityIcons name={icon} size={24} color="black" />
            <Text style={styles.settingText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e0e0e0',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    followButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'purple',
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    statText: {
        marginHorizontal: 10,
    },
    settingsContainer: {
        marginTop: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    settingText: {
        marginLeft: 10,
        fontSize: 16,
    },
});
