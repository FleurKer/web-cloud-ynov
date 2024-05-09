import { Link, router, Stack } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native-web";
import "../firebaseConfig";

export default function Layout() {
  const auth = getAuth();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, [user]);

  const logout = async () => {
    await auth.signOut();
    router.navigate("/signin");
    console.log("User signed out");
  };

  return (
    <>
      <Pressable style={styles.linkContainer}>
        <Link style={styles.link} href="/">
          Home
        </Link>
      </Pressable>
      {user ? (
        ""
      ) : (
        <Pressable style={styles.linkContainer}>
          <Link style={styles.link} href="/signup">
            Inscription
          </Link>
        </Pressable>
      )}
      {user ? (
        ""
      ) : (
        <Pressable style={styles.linkContainer}>
          <Link style={styles.link} href="/signin">
            Connexion
          </Link>
        </Pressable>
      )}
      {/* {user ? ( */}
      <Pressable style={styles.linkContainer}>
        <Link style={styles.link} href="/profile">
          Profile Page
        </Link>
      </Pressable>
      {/* ) : (
        ""
      )} */}
      {/* {user ? ( */}
      <View>
        <Pressable style={styles.linkContainer} onPress={logout}>
          <Text style={styles.link}>Déconnexion</Text>
        </Pressable>
      </View>
      {/* // ) : (
      //   ""
      // )} */}
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
