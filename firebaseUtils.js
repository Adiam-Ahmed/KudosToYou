import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { storage, db } from './firebaseConfig';




// Function to upload an image and get the download URL
export const uploadImage = async (uri, userId, setProgress) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, `uploads/${userId}/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.error("Error uploading image:", error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(storageRef);
                        resolve(downloadURL); 
                    } catch (error) {
                        console.error("Error getting download URL:", error);
                        reject(error);
                    }
                }
            );
        });
    } catch (error) {
        console.error("Error in uploadImage function:", error);
        throw error;
    }
};


// Function to save data to Firestore
export const saveSubmission = async (imageUrl, tags, description, userId, category, tagId, categoryId) => {
    const submissionData = {
        tagId,
        categoryId,
        userId, 
        imageUrl,
        tags,    
        description,        
        category,
        createdAt: new Date(),
    };

    try {
        await addDoc(collection(db, 'kudos'), submissionData);
        console.log("Submission successful!");
    } catch (error) {
        console.error("Error saving submission:", error.message);
    }
};

// Function to get data to Firestore
export const fetchData = async (kudos) =>{
    try {
        const querySnapshot = await getDocs(collection(db, 'kudos'));
        const data = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        return data
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

