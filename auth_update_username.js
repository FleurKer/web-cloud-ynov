import "./firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth();

export const updateDisplayName = async (newDisplayName) => {
  try {
    await updateProfile(auth.currentUser, { displayName: newDisplayName });
    return true;
  } catch (e) {
    return false;
  }
};
