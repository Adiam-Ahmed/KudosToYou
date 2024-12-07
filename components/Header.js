import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { categories } from '../assets/data/Categories';

const Header = () => {
    const [clickedCategoryId, setClickedCategoryId] = useState(null);

    const handlePress = (categoryId) => {
        setClickedCategoryId(categoryId);
    };

    const handleGoBack = () => {
        setClickedCategoryId(null);
    };

    const clickedCategory = categories.find((category) => category.categoryId === clickedCategoryId);

    const renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.categoryId)} style={styles.linkContainer}>
            <Text
                style={[
                    styles.linkText,
                    clickedCategoryId === item.categoryId && styles.underlined, // Conditionally underline the clicked link
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.linkContainer}>
            <Text
                style={[
                    styles.linkItemText,
                    clickedCategoryId === item.tagId && styles.underlined, // Conditionally underline the clicked link
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {clickedCategoryId === null ? (
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.categoryId.toString()} // Use `categoryId` as key
                    horizontal={true}
                    contentContainerStyle={styles.flatListContainer}
                />
            ) : (
                <View style={styles.clickedBox}>
                    <FlatList
                        data={clickedCategory?.items || []} // Display items under the clicked category
                        renderItem={renderItem}
                        keyExtractor={(item) => item.tagId.toString()} // Use `tagId` for item key
                        horizontal={true}
                        contentContainerStyle={styles.flatListContainer}
                    />
                    <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                        <Text style={styles.goBackText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#003c8f',
        height: 100,
        justifyContent: 'center',
    },
    flatListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 6,
    },
    underlined: {
        textDecorationLine: 'underline', // Underline the text when clicked
    },
    linkItemText: {
        fontSize: 12,
        color: '#003c8f',
        paddingHorizontal: 6,
    },
    clickedBox: {
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    goBackButton: {
        marginTop: 8,
        padding: 4,
        backgroundColor: '#003c8f',
        borderRadius: 4,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    goBackText: {
        color: 'white',
        fontSize: 10,
    },
});

export default Header;
