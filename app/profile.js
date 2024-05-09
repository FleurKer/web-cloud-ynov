import * as ImagePicker from "expo-image-picker";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import React from "react";
import { Image } from "react-native";
import { Button, StyleSheet, Text, TextInput, View } from "react-native-web";
import { updateUserPhotoUrl } from "../auth_update_photo_url";
import "../firebaseConfig";
import { uploadToFirebase } from "../storage_upload_file";

export default function User() {
  const auth = getAuth();

  const [user, setUser] = React.useState(auth.currentUser);
  const [displayName, setDisplayName] = React.useState(
    auth.currentUser?.displayName
      ? auth.currentUser.displayName
      : "not specified"
  );
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("currentUser", currentUser);
        const uid = user.uid;
        setUser(currentUser);
      } else {
        console.log("User is signed out");
        setUser(null);
      }
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const { uri } = result.assets[0];
      const fileName = uri.split("/").pop();
      const uploadResp = await uploadToFirebase(uri, fileName);
      let res = await updateUserPhotoUrl(uploadResp);
      if (res) {
        console.log(res);
        setUser({ ...user, photoURL: uploadResp });
      } else {
        console.log("Error");
      }
    }
  };

  const handleDisplayName = (displayName) => {
    setDisplayName(displayName);
    updateProfile(auth.currentUser, { displayName: displayName });
  };

  return (
    <>
      <Text style={styles.title}>Profile Page</Text>
      {/* {user ? ( */}
      <View style={styles.container}>
        <Text>Display name : </Text>
        <TextInput
          style={styles.textInput}
          placeholder={user ? user.displayName : "No display name"}
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <Button
            title="change display name"
            onPress={() => handleDisplayName(displayName)}
          ></Button>
        </View>
        <Text>Profile picture :</Text>
        <Image
          style={styles.image}
          source={{
            uri: auth.currentUser?.photoURL,
          }}
        />
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      {/* ) : (
        <View style={styles.container}>
          <Text>User not logged ... </Text>
        </View>
      )} */}
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
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginRight: "40%",
    marginLeft: "40%",
  },
  buttonContainer: {
    padding: 15,
    marginBottom: 10,
    textAlign: "center",
    marginRight: "40%",
    marginLeft: "40%",
  },
});
