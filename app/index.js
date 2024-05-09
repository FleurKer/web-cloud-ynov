import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getPostData } from "../get_post_data";
// import Toast from "react-native-root-toast";

export default function App() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getPostData();
      setPosts(data);
    };
    fetchData();
  }, []);

  console.log(posts);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Pressable style={styles.linkContainer}>
        <Link style={styles.link} href="/addPost">
          Add a new post
        </Link>
      </Pressable>
      {posts?.map((post) => {
        return (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <View style={styles.postContainer} key={post.id}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postText}>{post.text}</Text>
            </View>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  link: {
    padding: 5,
    textAlign: "center",
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  postContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postText: {
    fontSize: 14,
  },
});
