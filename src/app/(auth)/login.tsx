import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const AuthenticationPage = () => {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onSignUp() {
    router.push("/(auth)/signup");
  }

  async function onLogin() {
    setIsLoading(true)
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setIsLoading(false);
    if (error) Alert.alert(error.message);
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

      <Button onPress={onLogin} disabled={isLoading} text={ isLoading ? "Signing in..." : "Login"} />
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
