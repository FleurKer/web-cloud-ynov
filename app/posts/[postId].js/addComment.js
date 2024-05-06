// import { collection, query, where, getDocs } from "firebase/firestore";

// const q = query(collection(db, "cities"), where("capital", "==", true));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import "../../../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createComment } from "../../../create_comment_data";
import { Link } from "expo-router";

export default function AddComment() {
  const auth = getAuth();

  const [user, setUser] = React.useState(null);
  const [newComment, setNewComment] = React.useState(null);

  const global = useGlobalSearchParams();
  console.log(global);

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
    if (newComment) {
      createComment(newComment, user.uid, postId);
      //retourner à la page d'accueil
    }
  };

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <Text style={styles.title}>Write your comment</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(e) => setNewComment(e)}
            value={newComment}
          />

          <Link style={styles.link} onPress={() => validatePost()} href="/">
            Add a comment
          </Link>
          {/* <Button title="Ajouter un post" onPress={() => validatePost()} /> */}
        </View>
      ) : (
        <Text style={styles.text}>Thanks to connect</Text>
      )}
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
