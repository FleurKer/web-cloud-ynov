import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native-web";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import "../firebaseConfig";
import { getAuth } from "firebase/auth";

export default function Layout() {
  const auth = getAuth();

  const logout = async () => {
    await auth.signOut();
    console.log("User signed out");
  };

  return (
    <>
      <Pressable style={styles.linkContainer}>
        <Link style={styles.link} href="/">
          Home
        </Link>
      </Pressable>
      <Pressable style={styles.linkContainer}>
        <Link style={styles.link} href="/signin">
          Connexion
        </Link>
      </Pressable>
      <Pressable style={styles.linkContainer}>
        <Link style={styles.link} href="/signup">
          Inscription
        </Link>
      </Pressable>
      <Pressable style={styles.linkContainer}>
        <Link style={styles.link} href="/profile">
          User Page
        </Link>
      </Pressable>
      <View>
        <Pressable style={styles.linkContainer} onPress={logout}>
          <Text style={styles.link}>Déconnexion</Text>
        </Pressable>
      </View>
      <Stack />
    </>
  );
}

const styles = StyleSheet.create({
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
});
