import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from './firebaseConfig';  

// Function to upload an image and get the download URL
export const uploadImage = async (uri, setProgress) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `uploads/${Date.now()}`);
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
export const saveSubmission = async (imageUrl, tags, description) => {
    const tagsArray = tags.split(',').map(tag => tag.trim()); // Split and clean the tags input
    const submissionData = {
        imageUrl,
        tags: tagsArray,    // tags should be stored as an array
        description,        // description should be stored as a string
        createdAt: new Date(),
    };

    try {
        await addDoc(collection(db, 'submissions'), submissionData);
        console.log("Submission successful!");
    } catch (error) {
        console.error("Error saving submission:", error.message);
    }
};


