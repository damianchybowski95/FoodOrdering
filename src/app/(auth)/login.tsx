import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Stack, useRouter } from "expo-router";

const AuthenticationPage = () => {
  const router = useRouter();
  function onSignUp() {
    console.log("OnSignup clicked");
    router.push("/(auth)/signup");
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function onLogin(){    
    console.log("onLogin called");
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

      <Button onPress={onLogin} text="Login" />
      <Text onPress={onSignUp} style={styles.textButton}>
        Sign up
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
