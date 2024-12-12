import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native';
import { signOut } from "@firebase/auth";
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
    const achievements = ["Completed 100 Kudos", "Daily Streak: 30 days", "Top Contributor"];
    const navigation = useNavigation();

    const onLogout = async () => {
        try {
            await signOut(auth);
            Alert.alert("Success", "Logged out successfully");
            navigation.navigate('Login');
        } catch (error) {
            console.error("Logout Error: ", error);
            Alert.alert("Error", error.message);
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }} 
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileBio}>"Making progress one step at a time."</Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                {achievements.map((achievement, index) => (
                    <View key={index} style={styles.achievementItem}>
                        <Text style={styles.achievementText}>- {achievement}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <TouchableOpacity style={styles.notificationButton}>
                    <Text style={styles.notificationButtonText}>View Notifications</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsButton} onPress={onLogout}>
                    <Text style={styles.settingsButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileBio: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003c8f',
        marginBottom: 10,
    },
    achievementItem: {
        marginBottom: 5,
    },
    achievementText: {
        fontSize: 16,
        color: '#555',
    },
    notificationButton: {
        backgroundColor: '#5e92f3',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    notificationButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    settingsButton: {
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    settingsButtonText: {
        color: '#333',
        fontSize: 16,
    },
});

export default ProfileScreen;
