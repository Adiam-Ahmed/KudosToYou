import React, {useState} from "react";
import {View, Text, Animated, TouchableOpacity , ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopDrawer = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const animationValue = new Animated.Value(0);

    const toggleDrawer = () => {
        // Animate the drawer to open (1) or close (0)
        Animated.timing(animationValue, {
            toValue: isOpen ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Update the state to toggle the drawer
        setIsOpen(!isOpen);
    };
    
    // `drawerTranslateY` interpolates the `animationValue` from 0 (closed) to 1 (open)
    // When `animationValue` is 0, the drawer is hidden above the screen (-300)
    // When `animationValue` is 1, the drawer slides down to its visible position (0)
    const drawerTranslateY = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 0], // Adjust the height as needed; -300 hides it off-screen
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDrawer} style={StyleSheet.iconButton} >
                <Icon 
                    name={isOpen ? 'close' : 'drag-handle'}
                    type="material"
                    size= {30}
                    color= 'black'
                />
            </TouchableOpacity>
            {/* Step 5: Animated Top-Down Drawer */}
            <Animated.View style={[styles.drawer, { transform: [{ translateY: drawerTranslateY }] }]}>
                {/* Step 6: Scrollable List of Items */}
                <ScrollView>
                    {/* These are the items displayed in the drawer */}
                    <Text style={styles.drawerItem}>Item 1</Text>
                    <Text style={styles.drawerItem}>Item 2</Text>
                    <Text style={styles.drawerItem}>Item 3</Text>
                    <Text style={styles.drawerItem}>Item 4</Text>
                </ScrollView>
            </Animated.View>

        </View>
    )

}

// Step 7: Define the styles for the component using StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1, // The component takes up the full screen
        alignItems: 'center', // Center content horizontally
        justifyContent: 'flex-start', // Align content to the top
        paddingTop: 50, // Add padding at the top for the menu icon
    },
    iconButton: {
        position: 'absolute', // Position it on top of the screen
        top: 20, // Set distance from the top
        right: 20, // Set distance from the right
        zIndex: 10, // Make sure the icon is above other elements
    },
    drawer: {
        position: 'absolute', // Position it absolutely at the top of the screen
        top: 0,
        left: 0,
        right: 0,
        height: 300, // Height of the drawer
        backgroundColor: '#1565c0', // Background color of the drawer
        borderBottomLeftRadius: 20, // Rounded corners at the bottom
        borderBottomRightRadius: 20,
        padding: 20, // Add padding inside the drawer
        zIndex: 5, // Ensure it appears above the main content
    },
    drawerItem: {
        fontSize: 18, // Font size for drawer items
        color: 'white', // Text color
        paddingVertical: 10, // Vertical padding between items
    },
});

// Export the component so it can be used in other parts of the app
export default TopDrawer;
