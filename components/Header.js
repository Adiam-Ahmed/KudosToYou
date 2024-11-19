import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => {

    const links = [
        { id: '1', text: 'Link 1' },
        { id: '2', text: 'Link 2' },
        { id: '3', text: 'Link 3' },
        { id: '4', text: 'Link 4' },
        { id: '5', text: 'Link 5' },
    ];

    const [clickedIndex, setClickedIndex] = useState(null);

    const handlePress = (index) => {
        setClickedIndex(index); // Set clicked index to trigger underline
    };

    // Render each link in the FlatList
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handlePress(index)} style={styles.linkContainer}>
            <Text
                style={[
                    styles.linkText,
                    clickedIndex === index && styles.underlined, // Conditionally underline the clicked link
                ]}
            >
                {item.text}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={links}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true} // Horizontal list
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#003c8f',
        height: 100,
    },
    flatListContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    linkText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 10,
    },
    underlined: {
        textDecorationLine: 'underline', // Underline the text when clicked
    },
});

export default Header;
