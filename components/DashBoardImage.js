import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Image, Text, ActivityIndicator, View } from "react-native";
import { fetchData } from "../firebaseUtils";



const DashBoardImage = () => {
    const [dashBoardData, setDashBoardData] = useState([]);
    const [loading , setLoading ] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (isoDateString) =>{
        const dateObj = new Date(isoDateString);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits
        const date = String(dateObj.getDate()).padStart(2, '0'); // Ensure 2 digits

        return `${year}-${month}-${date}`;
    }

    useEffect(()=>{
        const getData = async()=>{
            try {
                const data = await fetchData('Kudos');
                setDashBoardData(data)
            } catch (error) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        }
        getData();
    },[])

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;


    return (
        <FlatList
            data={dashBoardData}
            renderItem={({ item }) => (
                <View style={styles.postContainer}>
                    {/* Image */}
                    <Image source={{ uri: item.image }} style={styles.image} />

                    {/* Description */}
                    <Text style={styles.description}>{item.description}</Text>

                    {/* Tags */}
                    <View style={styles.tagsContainer}>
                        {(item.tag || []).map((tag, index) => (
                            <Text key={index} style={styles.tag}>
                                #{tag}
                            </Text>
                        ))}
                    </View>

                    {/* Timestamp */}
                    <Text style={styles.timestamp}>
                        {formatDate(item.timestamp)}
                    </Text>
                </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
        backgroundColor: "#fff",
    },
    postContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 2,
    },
    image: {
        width: "100%",
        aspectRatio: 16 / 9, 
        resizeMode: "contain",
    },
    description: {
        padding: 10,
        fontSize: 16,
        color: "#333",
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    tag: {
        backgroundColor: "#efefef",
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 6,
        marginBottom: 6,
        fontSize: 14,
        color: "#555",
    },
    timestamp: {
        padding: 10,
        fontSize: 12,
        color: "#888",
        textAlign: "right",
    },
});

export default DashBoardImage;
