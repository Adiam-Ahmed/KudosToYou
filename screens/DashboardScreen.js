import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import DashBoardImage from '../components/DashBoardImage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 



const DashboardScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header />
            <DashBoardImage />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default DashboardScreen;
