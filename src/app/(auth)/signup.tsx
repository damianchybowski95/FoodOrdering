import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { useRouter } from "expo-router";

interface PossibleFormErrors {
  invalidEmail : string;
  passwordTooShort : string;
  differentPasswords : string;
}

const AuthenticationPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  function onSignIn() {
    console.log("onSignIn clicked");
    router.push("/(auth)/login");
  }

  function validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      // New form errors without destructured invalid email      
      setFormError("");
      return true;
    } else {
      setFormError("Invalid email");
      return false;
    }
  }

  function validatePassword(): boolean {
    if (password.length > 4) {
      setFormError("");
      return true;
    } else {
      setFormError("Password is too short");
      return false;
    }
  }

  function validateConfirmPassword(): boolean {
    if (password === confirmPassword) {
      setFormError("");
      return true;
    } else {
      setFormError("Passwords are different");
      return false;
    }
  }

  function onSignUp() {    
    if( validateEmail() && validatePassword() && validateConfirmPassword() ){
      console.log("Form data is valid");
    }
  
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.textInput}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.textInputPassword}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Password"
        style={styles.textInputPassword}
        secureTextEntry={true}
      />

      {formError && (
        <Text style={{ color: "red" }}>
          {/* Typescript limitation - displays first defined error in an object*/}        
          {formError}
        </Text>
      )}
      <Button onPress={onSignUp} text="Sign up" />
      <Text onPress={onSignIn} style={styles.textButton}>
        Sign in
      </Text>
    </View>
  );
};

export default AuthenticationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  label: {
    color: "black",
    fontSize: 16,
  },
  textInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  textInputPassword: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  textButton: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 20,
  },
});
