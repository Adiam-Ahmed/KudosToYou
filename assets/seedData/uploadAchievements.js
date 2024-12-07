import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { userAchievements } from '../data/Acheivments.js'


function generateDateBasedID() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36
    const randomPart = Math.random().toString(36).substring(2, 8); // Random string
    return `${timestamp}-${randomPart}`;
}


const uploadAchievements = async () => {
    try {
        for (const userAchievement of userAchievements) {
            const kudosDocRef = doc(
                collection(db, "kudos"),
                `${userAchievement.userId}_${generateDateBasedID()}`
            );
            await setDoc(kudosDocRef, {
                userId: userAchievement.userId,
                categoryId: userAchievement.categoryId,
                category: userAchievement.category,
                tagId: userAchievement.tagId,
                tag: userAchievement.tag,
                image: userAchievement.image,
                description: userAchievement.description,
                timestamp: userAchievement.timestamp.createdAt
            });
            console.log(`Achievement "${userAchievement.description}" uploaded successfully.`);
        }
    } catch (error) {
        console.error("Error uploading achievements:", error);
    }
};

uploadAchievements();