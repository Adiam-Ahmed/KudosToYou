import React from 'react';
import { Alert } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Button, Icon } from 'react-native-elements';

const OnboardingScreen = ({ navigation }) => (
    <Onboarding
        showDone={true}
        onSkip={() => navigation.replace('Home')}
        onDone={() => navigation.replace('Home')}
        pages={[
            {
                title: 'Hey!',
                subtitle: 'Welcome to Kudos To You!',
                backgroundColor: '#003c8f',
                image: (
                    <Icon
                        name="hand-peace-o"
                        type="font-awesome"
                        size={100}
                        color="white"
                    />
                ),
            },
            {
                title: 'Celebrate Your Wins',
                subtitle: 'Boost Your Confidence',
                backgroundColor: '#5e92f3',
                image: (
                    <Icon
                        name="star"
                        type="font-awesome"
                        size={100}
                        color="white"
                    />
                ),
            },
            {
                title: 'Store and Revisit Your Achievements',
                subtitle: 'To Reinforce Your Value',
                backgroundColor: '#1565c0',
                image: (
                    <Icon name="trophy" type="font-awesome" size={100} color="white" />
                ),
            },
            {
                title: 'Whenever Doubt Strikes,',
                subtitle: "Look Back and See All the Great Things You've Doneo Reinforce Your Value",
                backgroundColor: '#5e92f3',
                image: (
                    <Icon name="history" type="font-awesome" size={100} color="white" />
                ),
            },
            {
                title: "That's Enough",
                subtitle: (
                    <Button
                        title={'Get Started'}
                        containerViewStyle={{ marginTop: 20 }}
                        backgroundColor={'white'}
                        borderRadius={5}
                        textStyle={{ color: '#003c8f' }}
                        onPress={() => {
                            Alert.alert('done');
                            navigation.replace('Home');  // Navigate to home after "Get Started"
                        }}
                    />
                ),
                backgroundColor: '#003c8f',
                image: (
                    <Icon name="rocket" type="font-awesome" size={100} color="white" />
                ),
            },
        ]}
    />
);

export default OnboardingScreen;