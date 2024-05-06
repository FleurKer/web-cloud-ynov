import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { signup } from "../auth_signup_password";
import { signinWithGithub } from "../auth_github_signin_popup";
import { router } from "expo-router";
import { loginWithPhoneNumber } from "../auth_phone_signin";
import { verifyCode } from "../auth_phone_verify_code";
import { ScrollView } from "react-native-web";

export default function Signin() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [code, setCode] = React.useState("");

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const checkPassword = (password) => {
    return passwordRegex.test(password);
  };

  const emailRegex = /\S+@\S+\.\S+/;

  const checkEmail = (email) => {
    return emailRegex.test(email);
  };

  handleSignup = (email, password) => {
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
    <ScrollView>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>Connect with email</Text>
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
      <Text style={styles.subtitle}>Connect with GitHub</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="connect with github"
          onPress={() => signinWithGithub()}
        ></Button>
      </View>
      <Text style={styles.subtitle}>Connect with your phone number</Text>
      <Text style={styles.text}>Phone number</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(input) => setPhoneNumber(input)}
        value={phoneNumber}
      ></TextInput>
      <View style={styles.buttonContainer}>
        <Button
          title="Connect by phone number"
          onPress={() => loginWithPhoneNumber(phoneNumber)}
        ></Button>
      </View>
      <Text style={styles.text}>Code to connect with phone number</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(input) => setCode(input)}
        value={code}
      ></TextInput>
      <View style={styles.buttonContainer}>
        <Button
          title="Code for phone"
          onPress={() => verifyCode(code)}
        ></Button>
      </View>
      <div id="recaptcha-container"></div>
    </ScrollView>
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
