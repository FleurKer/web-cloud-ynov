import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { provider } from "./auth_github_provider_create";
import "./firebaseConfig";

//utilise le app par défault de firebase
const auth = getAuth();
export const signinWithGithub = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Sign in
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log("signin success with github");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    });
};
