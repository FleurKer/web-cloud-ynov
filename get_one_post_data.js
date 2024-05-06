import "./firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore();

export const getOnePostData = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};
