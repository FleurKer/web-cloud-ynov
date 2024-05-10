import { router, useGlobalSearchParams } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { addCommentData } from "../../../add_comment_data";
import "../../../firebaseConfig";
import { db } from "../../../firebaseConfig";
import { getOnePostData } from "../../../get_one_post_data";

export default async function AddComment() {
  const auth = getAuth();

  const [user, setUser] = React.useState(null);
  const [newComment, setNewComment] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  const global = useGlobalSearchParams();

  React.useEffect(() => {
    const fetchUser = () => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          console.log("connected", currentUser.uid);
        } else {
          console.log(null);
          setUser(null);
        }

        const fetchPost = async () => {
          let res = await getOnePostData(global.postId);
          setPost(res);
        };
        fetchPost();
      });
    };
    fetchUser();

    const fetchPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("id", "==", global.postId)
      );
      const querySnapshot = await getDocs(q);
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, data: doc.data() });
      });
      setComments(fetchedComments);
    };

    fetchPosts();
  }, [auth, global.postId]);

  const validatePost = () => {
    if (newComment && user) {
      addCommentData(newComment, global.postId, user.uid);
      setComments([...comments, newComment]);
      // Retourner à la page du post
      router.navigate(`/posts/${global.postId}`);
    }
  };

  return (
    <>
      {/* {user ? ( */}
      <View style={styles.container}>
        <Text style={styles.title}>Write your comment</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setNewComment(e)}
          value={newComment}
        />
        <View style={styles.buttonContainer}>
          <Button title="Ajouter un post" onPress={() => validatePost()} />
        </View>
        <Text style={styles.title}>Comments</Text>
        {comments.map((comment, index) => (
          <Text key={index}>{comment[index]}</Text>
        ))}
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
