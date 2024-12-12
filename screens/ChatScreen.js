import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const ChatScreen = () => {
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Save and Schedule');
    const [notification, setNotification] = useState(null);

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
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });

        const getNotificationPermission = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access notifications was denied');
            }
        };
        getNotificationPermission();

        const subscription = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        return () => subscription.remove();
    }, []);

    const scheduleNotification = async () => {
        const error = validateInputs();
        if (error) {
            Alert.alert("Validation Error", error);
            return;
        }
        try {
            setLoading(true);
            const triggerTime = new Date(date);

            if (triggerTime <= new Date()) {
                alert('Please select a future date and time.');
                return;
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Your Text Time Capsule is here",
                    body: text,
                },
                trigger: triggerTime,
            });

            alert('Notification Scheduled!');
            setButtonText('Text Saved');
            setTimeout(resetForm, 2000);
        } catch (error) {
            Alert.alert('Error', `Failed to upload submission: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Animated.View style={[styles.inner, { opacity: animation }]}>
                    <Text style={styles.title}>Time Capsule</Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Write your letter..."
                        value={text}
                        onChangeText={setText}
                        multiline
                        autoFocus
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inner: {
        padding: 30,
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#222',
        marginBottom: 20,
    },
    textInput: {
        backgroundColor: '#003c8f',  
        padding: 16,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        elevation: 5,
        textAlignVertical: 'top', 
        color: '#333', 
       
    },
    dateButton: {
        backgroundColor: '#003c8f',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    dateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#ff7043',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ChatScreen;
