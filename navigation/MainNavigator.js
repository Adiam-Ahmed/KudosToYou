import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to check authentication

const Stack = createStackNavigator();

const MainNavigator = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the app has been launched before
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });

        // Check if the user is authenticated (using Firebase auth)
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setIsAuthenticated(true); // User is logged in
        } else {
            setIsAuthenticated(false); // User is not logged in
        }
    }, []);

    if (isFirstLaunch === null || isAuthenticated === null) {
        return null; // Loading state
    }

    return (
        <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding' : isAuthenticated ? 'Home' : 'SignUp'}>
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;