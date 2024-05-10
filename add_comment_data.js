import { addDoc, collection, getFirestore } from "firebase/firestore";
import "./firebaseConfig";

const db = getFirestore();

export const createCommentData = async ({ comment, postID, createdBy }) => {
  try {
    const docRef = await addDoc(collection(db, "comment"), {
      comment: comment,
      postID: postID,
      date: new Date(),
      createdBy: createdBy,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
