import "./firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
const db = getFirestore();

export const createComment = async (comment, createdBy, postId) => {
  // createdBy id de l'user qui a créé le post
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      comment,
      date: new Date(),
      createdBy,
      postId,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
