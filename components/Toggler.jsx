import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { categories } from '../assets/data/Categories';


const Toggler = ({ selectedTags, setSelectedTags }) => {
    const [expandedCategories, setExpandedCategories] = useState([]);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            if (selectedTags.length < 5) {
                setSelectedTags([...selectedTags, tag]);
            } else {
                Alert.alert('Tag Limit Reached', 'You can select up to 5 tags only.');
            }
        }
    };

    const toggleCategory = (category) => {
        setExpandedCategories((prev) =>
            prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Select Tags</Text>
            {Object.entries(categories).map(([category, tags], index) => (
                <View key={index} style={styles.category}>
                    <TouchableOpacity
                        style={styles.categoryHeader}
                        onPress={() => toggleCategory(category)}
                    >
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <Text style={styles.toggleSymbol}>
                            {expandedCategories.includes(category) ? '-' : '+'}
                        </Text>
                    </TouchableOpacity>
                    {expandedCategories.includes(category) && (
                        <View style={styles.tagContainer}>
                            {tags.map((tag, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[
                                        styles.tagChip,
                                        selectedTags.includes(tag) && styles.selectedChip,
                                    ]}
                                    onPress={() => toggleTag(tag)}
                                >
                                    <Text
                                        style={[
                                            styles.tagText,
                                            selectedTags.includes(tag) && styles.selectedText,
                                        ]}
                                    >
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,

    },
    category: {
        marginBottom: 10,
        flexDirection: 'column',

    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e8eaf6',
        padding: 10,
        borderRadius: 5,
    },
    categoryTitle: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    toggleSymbol: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,

    },
    tagChip: {
        backgroundColor: '#ccc',
        padding: 8,
        borderRadius: 20,
        margin: 5,
    },
    selectedChip: {
        backgroundColor: '#007bff',
    },
    tagText: {
        color: '#000',
        fontSize: 10,
    },
    selectedText: {
        color: '#fff',
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});


export default Toggler; 