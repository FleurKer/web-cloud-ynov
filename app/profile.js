import * as ImagePicker from "expo-image-picker";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import React from "react";
import { Image } from "react-native";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native-web";
import { updateUserPhotoUrl } from "../auth_update_photo_url";
import "../firebaseConfig";
import { uploadToFirebase } from "../storage_upload_file";
import { set } from "firebase/database";
// import { updateDisplayName } from "../auth_update_username";

export default function User() {
  const auth = getAuth();

  const [user, setUser] = React.useState(auth.currentUser);
  const [displayName, setDisplayName] = React.useState(
    auth.currentUser?.displayName
      ? auth.currentUser.displayName
      : "not specified"
  );
  const [image, setImage] = React.useState(
    auth.currentUser?.photoURL ? auth.currentUser.photoURL : null
  );

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
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
      updateProfile(auth.currentUser, { photoURL: uploadResp });

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
    // updateDisplayName(displayName);

    setUser({ ...user, displayName: displayName });
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Profile Page</Text>
      {user ? (
        <View style={styles.container}>
          <Text style={styles.text}>Display name : </Text>
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
          <Text style={styles.text}>Profile picture :</Text>
          {user.photoURL ? (
            <Image
              style={styles.image}
              source={{
                uri: user.photoURL,
              }}
            />
          ) : null}
          <View style={styles.buttonContainer}>
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>User not logged ... </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  text: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 15,
    marginBottom: 10,
    textAlign: "center",
    marginRight: "40%",
    marginLeft: "40%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
