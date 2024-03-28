import "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const signin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sign in
      const user = userCredential.user;
      console.log(user);
      console.log("Sign in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
