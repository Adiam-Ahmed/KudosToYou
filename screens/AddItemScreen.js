import React, { useState } from 'react';
import {Text, TextInput, StyleSheet, Image, Alert, TouchableOpacity, View, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { uploadImage, saveSubmission } from '../firebaseUtils';
import Toggler from '../components/Toggler';


const AddItemScreen = () => {
    const userId = 12345
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState([])
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState([]);
    const [tagId, setTagId] = useState([]);

 

    // Function to handle image selection
    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access the media library is required.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const resizedImageUri = await resizeImage(result.assets[0].uri);
                setImage(resizedImageUri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Something went wrong while picking the image.');
        }
    };

    // Function to resize image before uploading
    const resizeImage = async (uri) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipResult.uri;
    };

    // Validation for form inputs
    const validateInputs = () => {
        if (!image) return 'Please upload an image.';
        if (tags.length === 0) return 'Please select at least one tag.';
        if (!description) return 'Description is required.';
        return null;
    };

    // Reset form after submission
    const resetForm = () => {
        setImage(null);
        setTags([]);
        setCategory([])
        setDescription('');
        setUploadProgress(0);
        setLoading(false);
    };

    // Handle form submission
    const handleSubmit = async () => {
        const error = validateInputs();
        if (error) {
            Alert.alert("Validation Error", error);
            return;
        }

        try {
            setLoading(true);
            const downloadURL = await uploadImage(image, userId, setUploadProgress); // Upload image
            await saveSubmission(downloadURL, tags, description, userId, category, categoryId, tagId); // Save submission
            console.log('Selected Tags:', downloadURL, tags, description, userId, category);
            Alert.alert('Success', 'Your submission has been uploaded!');
            resetForm();
        } catch (err) {
            console.error("Error during submission:", err);
            Alert.alert('Error', `Failed to upload submission: ${err.message}`);
        } finally {
            setLoading(false); 
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>Create New Post</Text>
                    <MaterialIcons name="add-photo-alternate" size={30} color="#fff" />
                </View>

                {/* Image Picker */}
                <View style={styles.card}>
                    <Text style={styles.label}>Upload Image</Text>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                            <MaterialIcons name="photo-camera" size={20} color="#007bff" />
                            <Text style={styles.imagePickerButtonText}>Select an Image</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Tags Section */}
                <Toggler 
                    selectedTags={tags} setSelectedTags={setTags} 
                    selectedCategory={category } setSelectedCategory = {setCategory} 
                    selectedCategoryId={categoryId} setSelectedCategoryId={setCategoryId}
                    selectedTagId={tagId} setSelectedTagId={setTagId} 
                />

                {/* Description Section */}
                <View style={styles.card}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        placeholder="Write a description..."
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                </View>

                {/* Progress Bar */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <View style={styles.progressContainer}>
                        <Text style={styles.progressText}>{`Uploading: ${Math.round(uploadProgress)}%`}</Text>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
                        </View>
                    </View>
                )}

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.submitButton, loading && styles.disabledButton]}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },
    content: {
        flexGrow: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        marginTop:25,
        padding: 20,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    card: {
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
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
    },
    imagePickerButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#007bff',
    },
    progressContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    progressText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#007bff',
    },
    progressBarBackground: {
        width: '90%',
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#007bff',
        borderRadius: 4,
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#7da4c9',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddItemScreen;