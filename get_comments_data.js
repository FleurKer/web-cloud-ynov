import "./firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

export const getCommentsData = async () => {
  // let res = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const res = [];
  const querySnapshot = await getDocs(collection(db, "comments"));
  querySnapshot.forEach((doc) => {
    res.push({ id: doc.id, ...doc.data() });
  });
  return res;
};
