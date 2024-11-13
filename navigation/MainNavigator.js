import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';


const Stack = createStackNavigator();

const MainNavigator = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);

    // useEffect(() => {
    //     AsyncStorage.getItem('alreadyLaunched').then(value => {
    //         if (value == null) {
    //             AsyncStorage.setItem('alreadyLaunched', 'true');
    //             setIsFirstLaunch(true);
    //         } else {
    //             setIsFirstLaunch(false);
    //         }
    //     });
    // }, []);

    // if (isFirstLaunch === null) {
    //     return null;  // Loading state
    // }

    return (
        <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding' : 'Home'}>
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

        </Stack.Navigator>
    );
};

export default MainNavigator;
