import React from "react";
import { StyleSheet, FlatList, Image } from "react-native";

const images = [
    { id: '1', src: require('../assets/images/img1.jpg') },
    { id: '2', src: require('../assets/images/img2.jpg') },
    { id: '3', src: require('../assets/images/img3.jpg') },
    { id: '4', src: require('../assets/images/img4.jpg') },
    { id: '5', src: require('../assets/images/img5.jpg') },
    { id: '6', src: require('../assets/images/img6.jpg') },
];

const DashBoardImage = () => {
    return (
        <FlatList
            data={images}
            renderItem={({ item }) => (
                <Image
                    style={styles.image}
                    source={item.src}
                    key={item.id}
                />
            )}
            keyExtractor={(item) => item.id}
            horizontal={false}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350,
        marginBottom: 0,
        resizeMode: 'cover', 
    },
});

export default DashBoardImage;
