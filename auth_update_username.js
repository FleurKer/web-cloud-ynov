import { getAuth, updateProfile } from "firebase/auth";
import "./firebaseConfig";

const auth = getAuth();

export const updateDisplayName = async (newDisplayName) => {
  const getToken = () => {
    // const result = from(
    //   this.afAuth.auth.currentUser.getIdToken().then((token) => {
    //     console.log(token);
    //     return token;
    //   })
    // );

    // return result;

    return this.afAuth.authState.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return from(user.getIdToken());
        }
        return of(null);
      })
    );
  };

  try {
    await updateProfile(auth.currentUser, { displayName: newDisplayName });
    return true;
  } catch (e) {
    return false;
  }
};
