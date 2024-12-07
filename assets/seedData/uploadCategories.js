import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { categories } from "../data/Categories.js";


const uploadCategories = async () => {
    try {
        categories.forEach(async (category) => {
            const categoryDocRef = doc(collection(db, "categories"), category.categoryId.toString());
            await setDoc(categoryDocRef, {
                name: category.name,
                items: category.items
            });
            console.log(`Category ${category.name} uploaded successfully.`);
        });
    } catch (error) {
        console.error("Error uploading categories:", error);
    }
};

uploadCategories();