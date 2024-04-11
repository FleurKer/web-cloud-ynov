import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { signup } from "./auth_signup_password";
import { signin } from "./auth_signin_password";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import { signinWithGithub } from "./auth_github_signin_popup";
import { loginWithPhoneNumber } from "./auth_phone_signin";
import { verifyCode } from "./auth_phone_verify_code";

export default function App() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [code, setCode] = React.useState("");

  //Regex for email validation
  const emailRegex = /\S+@\S+\.\S+/;

  //Regex for password validation
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const checkPassword = (password) => {
    return passwordRegex.test(password);
  };

  const checkEmail = (email) => {
    return emailRegex.test(email);
  };

  const testToast = () => {
    Toast.show("Test works!");
  };

  handleSignup = (email, password) => {
    if (checkEmail(email) && checkPassword(password)) {
      signup(email, password);
      console.log("Signup success");
      // testToast();
    } else {
      console.log("Signup failed");
      // testToast();
    }
  };

  handleSignin = (email, password) => {
    if (checkEmail(email) && checkPassword(password)) {
      signin(email, password);
      console.log("Signin success");
      // testToast();
    } else {
      console.log("Signin failed");
      // testToast();
    }
  };

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
          secureTextEntry={true}
        ></TextInput>
        <Text>Phone number</Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => setPhoneNumber(input)}
          value={phoneNumber}
        ></TextInput>
        <Text>code phone number</Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => setCode(input)}
          value={code}
        ></TextInput>
        <Button
          title="Sign up"
          onPress={() => handleSignup(email, password)}
        ></Button>
        <Button
          title="Sign in"
          onPress={() => handleSignin(email, password)}
        ></Button>
        <Button
          title="connect with github"
          onPress={() => signinWithGithub()}
        ></Button>
        <Button
          title="Connect by phone number"
          onPress={() => loginWithPhoneNumber(phoneNumber)}
        ></Button>
        <Button
          title="Code for phone"
          onPress={() => verifyCode(code)}
        ></Button>
        <div id="recaptcha-container"></div>
      </View>
    </RootSiblingParent>
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
