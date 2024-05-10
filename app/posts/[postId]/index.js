import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native-web";
import "../../../firebaseConfig";
import { getCommentsData } from "../../../get_comments_data";
import { getOnePostData } from "../../../get_one_post_data";

export default function NewPost() {
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const local = useLocalSearchParams();

  React.useEffect(() => {
    const fetchPost = async () => {
      let res = await getOnePostData(local.postId);
      setPost(res);
    };
    fetchPost();

    const fetchComments = async () => {
      let res = await getCommentsData();
      setComments(res);
    };
    fetchComments();
  }, [local.postId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {post?.title}</Text>
      <Text style={styles.text}>Text: {post?.text}</Text>
      {comments ? (
        comments.map((comment) => (
          <View key={comment.id}>
            <Text style={styles.subtitle}>Comment: {comment.data.comment}</Text>
            <Text style={styles.text}>Date: {comment.data.date}</Text>
            <Text style={styles.text}>
              Created by: {comment.data.createdBy}
            </Text>
          </View>
        ))
      ) : (
        <View>
          <Text>No comments yet</Text>
        </View>
      )}{" "}
      <View style={styles.buttonContainer}>
        <Link
          style={styles.textLink}
          href={`/posts/${local.postId}/addComment`}
        >
          Add a comment
        </Link>
      </View>
    </View>
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
    backgroundColor: "#1189f2",
  },
  textLink: {
    color: "white",
    textAlign: "center",
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
