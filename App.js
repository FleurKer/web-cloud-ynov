import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { signup } from "./auth_signup_password";
import { signin } from "./auth_signin_password";

export default function App() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Button title="Sign up" onPress={() => signup(email, password)}></Button>
      <Button title="Sign in" onPress={() => signin(email, password)}></Button>
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
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
