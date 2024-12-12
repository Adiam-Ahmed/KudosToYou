import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { saveTextCapsule } from '../firebaseUtils';

const ChatScreen = () => {
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Save and Schedule');

    // Validation for form inputs
    const validateInputs = () => {
        if (!text) return 'Please insert a text.';
        if (!date) return 'Please insert a date.';
        return null;
    };

    const resetForm = () => {
        setText('');
        setShowPicker(false);
        setLoading(false);
        setButtonText('Save and Schedule');
    };

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        const requestNotificationPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to send notifications is required!');
            }
        };

        requestNotificationPermissions();
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
    };

    const scheduleNotification = async () => {
        const error = validateInputs();
        if (error) {
            Alert.alert("Validation Error", error);
            return;
        }

        try {
            setLoading(true);
            await saveTextCapsule(text, date);

            const triggerTime = new Date(date).getTime() - new Date().getTime(); // Time difference in ms

            // Check if the date is in the past
            if (triggerTime <= 0) {
                Alert.alert("Invalid Date", "Please select a future date.");
                return;
            }

            // Schedule the notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Your Time Capsule",
                    body: text,
                },
                trigger: {
                    seconds: Math.floor(triggerTime / 1000), // Convert milliseconds to seconds
                    repeats: false,
                },
            });

            alert('Notification Scheduled!');
            setButtonText('Text Saved');
            setTimeout(resetForm, 2000);  // Reset form after 2 seconds

        } catch (error) {
            console.error("Error during submission:", error);
            Alert.alert('Error', `Failed to upload submission: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: animation }]}>
            <Text style={styles.title}>Time Capsule</Text>

            <TextInput
                style={styles.textInput}
                placeholder="Write your letter..."
                value={text}
                onChangeText={setText}
                multiline
            />

            <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
                <Text style={styles.dateButtonText}>Pick Date & Time</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="datetime"
                    display="default"
                    onChange={onChange}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>{buttonText}</Text>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        elevation: 3,
    },
    dateButton: {
        backgroundColor: '#5e92f3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    dateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#ff7043',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ChatScreen;
