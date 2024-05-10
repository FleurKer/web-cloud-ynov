import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native-web";
import { signup } from "../auth_signup_password";

export default function Signup() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const checkPassword = (password) => {
    return passwordRegex.test(password);
  };

  const emailRegex = /\S+@\S+\.\S+/;

  const checkEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleSignup = (email, password) => {
    if (checkEmail(email) && checkPassword(password)) {
      signup(email, password);
      console.log("Signup success");
      router.replace("/profile");
      // testToast();
    } else {
      console.log("Signup failed");
      // testToast();
    }
  };

  return (
    <View>
      <Text style={styles.title}>Inscription</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
      ></TextInput>
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign up"
          onPress={() => handleSignup(email, password)}
        ></Button>
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
