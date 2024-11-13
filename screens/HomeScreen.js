import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AddItemScreen from '../screens/AddItemScreen';
import ChatScreen from '../screens/ChatScreen';
import DashboardScreen from '../screens/DashboardScreen'; // Example new screen

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home-outline';
                            break;
                        case 'AddItem':
                            iconName = 'add-circle-outline';
                            break;
                        case 'Chat':
                            iconName = 'chatbubbles-outline';
                            break;
                        default:
                            iconName = 'ellipsis-horizontal-circle-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            {/* Ensure each screen is passed the proper component */}
            <Tab.Screen name="Dashboard " component={DashboardScreen} options={{ headerShown: false }} />
            <Tab.Screen name="AddItem" component={AddItemScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default HomeScreen;
