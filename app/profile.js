import React from "react";
import { StyleSheet, Pressable, Text, TextInput } from "react-native-web";
import "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function User() {
  // const [displayName, setDisplayName] = React.useState(
  //   user.displayName ? user.displayName : ""
  // );
  // const [email, setEmail] = React.useState(user.email);
  // const [phoneNumber, setPhoneNumber] = React.useState(user.phoneNumber);
  // const [photoURL, setPhotoURL] = React.useState(user.photoURL);

  const [user, setUser] = React.useState(null);

  const auth = getAuth();

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged", currentUser);
      if (currentUser) {
        console.log("currentUser", currentUser);
        // const uid = user.uid;
        // console.log(uid);
        // const displayName = user.displayName;
        // const email = user.email;
        // const photoURL = user.photoURL;
        // const emailVerified = user.emailVerified;
        setUser(currentUser);
      } else {
        console.log(null);
        // User is signed out
        setUser(null);
      }
    });
  }, []);

  // const onChangeDatas = (displayName, email, PhoneNumber, photoURL) => {
  //   setDisplayName(displayName);
  //   setEmail(email);
  //   setPhoneNumber(phoneNumber);
  //   setPhotoURL(photoURL);
  //   console.log("onChangeDatas", displayName, email, phoneNumber, photoURL);
  // };

  return (
    <>
      <Text style={styles.title}>Profile Page</Text>
      <Text>{user ? user.phoneNumber : "No phone number"}</Text>
      {/* <TextInput style={styles.input} value={displayName}></TextInput>
      <TextInput style={styles.input} value={email}></TextInput>
      <TextInput style={styles.input} value={phoneNumber}></TextInput>
      <TextInput style={styles.input} value={photoURL}></TextInput> */}
      {/* <Pressable
        title="Valider les modifications"
        onPress={() => onChangeDatas(displayName, email, phoneNumber, photoURL)}
      ></Pressable> */}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
