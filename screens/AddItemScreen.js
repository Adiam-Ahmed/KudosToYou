import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const AddItemScreen = () => {
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');

    const pickImage = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            quality:1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri)

        }
    }

    const handleSubmit = ()=>{
        if(!image || !tags || !description){
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }
        // TODO: Submit data to backend
        Alert.alert("Success", "Form submitted!");
        setImage(null);
        setTags('');
        setDescription('');
    }




    return (
        <View style= {styles.container}>
            <Text style = {styles.label}>Upload Image</Text>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity title='Pick an Image' onPress={pickImage} />
            <Text style = {styles.label}>Insert Tags</Text>
            <TextInput 
                style= {styles.input}
                placeholder='eg: motivation, accomplishment, praise'
                value={tags}
                onChangeText={setTags}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput 
                style= {[styles.input,{height:80}]}
                placeholder='Write a description...'
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TouchableOpacity title='Submit' onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F6FF'
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    },
    image:{
        width: '100%',
        height:200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
});

export default AddItemScreen;
