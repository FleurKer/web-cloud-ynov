import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native-web";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useLocalSearchParams } from "expo-router";
import { getOnePostData } from "../../../get_one_post_data";

export default function NewPost() {
  const [post, setPost] = React.useState(null);
  const local = useLocalSearchParams();

  React.useEffect(() => {
    const fetchPost = async () => {
      let res = await getOnePostData(local.postId);
      setPost(res);
    };
    fetchPost();
  }, [local.postId]);

  return (
    <View style={StyleSheet.container}>
      <Text style={styles.title}>Title: {post?.title}</Text>
      <Text style={styles.text}>Text: {post?.text}</Text>
      <Link href={`/posts/${local.postId}/addComment`}>Add a comment</Link>
      {/* <Text style={styles.text}>Commentaires</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({});
