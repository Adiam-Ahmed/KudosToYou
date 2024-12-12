import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AddItemScreen from '../screens/AddItemScreen';
import ChatScreen from '../screens/ChatScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from './ProfileScreen';


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
                        case 'Upload':
                            iconName = "cloud-upload-outline";
                            break;
                        case 'Dear Future Self':
                            iconName = 'chatbubbles-outline';
                            break;
                        case 'Profile Screen':
                            iconName = 'person-outline';
                            break;
                        default:
                            iconName = 'ellipsis-horizontal-circle-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard " component={DashboardScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Upload" component={AddItemScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Dear Future Self" component={ChatScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile Screen" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default HomeScreen;
