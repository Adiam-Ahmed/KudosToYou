import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';


const AddItemScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Item screen </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default AddItemScreen;
