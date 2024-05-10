import { Link } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { createPost } from "../add_post_data";
import "../firebaseConfig";

export default function AddPost() {
  const auth = getAuth();

  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged", currentUser);
      if (currentUser) {
        console.log("currentUser", currentUser);
        setUser(currentUser);
      } else {
        console.log(null);
        setUser(null);
      }
    });
  }, []);

  const validatePost = () => {
    if (title && text) {
      createPost(title, text, user.uid);
    }
  };

  return (
    <>
      {/* {user ? ( */}
      <View style={styles.container}>
        <Text style={styles.title}>Add a comment</Text>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setTitle(e)}
          value={title}
        />
        <Text style={styles.text}>Text</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setText(e)}
          value={text}
        />
        <Link style={styles.link} onPress={() => validatePost()} href="/">
          Ajouter un post
        </Link>
      </View>
      {/* ) : (
        <Text style={styles.text}>Thanks to connect</Text>
      )} */}
    </>
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
