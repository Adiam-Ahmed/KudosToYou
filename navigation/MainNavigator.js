import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 

const Stack = createStackNavigator();

const MainNavigator = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
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
        // Monitor authentication state changes
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true); // User is logged in
            } else {
                setIsAuthenticated(false); // User is not logged in
            }
        });


        return () => unsubscribe();
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