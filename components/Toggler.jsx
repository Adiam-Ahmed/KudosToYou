import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { categories } from '../assets/data/Categories';

const Toggler = ({ selectedTags, setSelectedTags, setSelectedCategory, setSelectedTagId, setSelectedCategoryId, selectedCategoryId, selectedTagId }) => {

    const [expandedCategories, setExpandedCategories] = useState([]);

    const getCategoryId = (categoryName)=>{
        const findCategoryId = categories.find((cat)=> cat.name === categoryName)
        return findCategoryId ? findCategoryId.categoryId : null; 
    }

    const getTagId = (tagName) => {
        // Search for the category that contains the tag name
        const findCategory = categories.find((category) =>
            category.items.some(item => item.name === tagName) // Look for tag in category's items
        );
        // If category is found, find the tag inside the items array
        if (findCategory) {
            const findTag = findCategory.items.find(item => item.name === tagName);
            return findTag ? findTag.tagId : null; // Return the tagId if found
        }

        return null; 
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            // Tag is already selected, so remove it
            setSelectedTags(selectedTags.filter((t) => t !== tag));
            setSelectedTagId((prev) => {
                const tagIds = getTagId(tag); // Get the tagId
                if (tagIds === null) return prev; // If tagId not found, do nothing
                return prev.filter((id) => id !== tagIds); // Remove tagId if already selected
            });
        } else {
            // Tag is not selected, so add it (but check if we can select more)
            if (selectedTags.length < 5) {
                setSelectedTags([...selectedTags, tag]);
                const tagIds = getTagId(tag);
                if (tagIds !== null) {
                    setSelectedTagId((prev) => [...prev, tagIds]); // Add tagId to the list
                }
            } else {
                // If more than 5 tags selected, show an alert
                Alert.alert('Tag Limit Reached', 'You can select up to 5 tags only.');
            }
        }
    };

    // console.log(selectedTagId)
    // console.log(selectedCategoryId)

    const toggleCategory = (category) => {
        setExpandedCategories((prev) =>
            prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
        );
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category) 
                : [...prev, category] 
        );
        setSelectedCategoryId((prev)=>{
            const categoryIds = getCategoryId(category);
            
            if(prev.includes(categoryIds)){
                return prev.filter((id)=> id != categoryIds)
            }else{
                return [...prev, categoryIds]
            }
        })
        
    };

   
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Select Tags</Text>
            {categories.map((category, index) => (
                <View key={index} style={styles.category}>
                    <TouchableOpacity
                        style={styles.categoryHeader}
                        onPress={() => toggleCategory(category.name)}
                    >
                        <Text style={styles.categoryTitle}>{category.name}</Text>
                        <Text style={styles.toggleSymbol}>
                            {expandedCategories.includes(category.name) ? '-' : '+'}
                        </Text>
                    </TouchableOpacity>
                    {expandedCategories.includes(category.name) && (
                        <View style={styles.tagContainer}>
                            {category.items.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[
                                        styles.tagChip,
                                        selectedTags.includes(item.name) && styles.selectedChip,
                                    ]}
                                    onPress={() => toggleTag(item.name)}
                                >
                                    <Text
                                        style={[
                                            styles.tagText,
                                            selectedTags.includes(item.name) && styles.selectedText,
                                        ]}
                                    >
                                        {item.name}
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