import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
        }}
      />
      <Stack.Screen name="[id]" options={{ title: `Details` }} />
    </Stack>
  );
};

export default MenuStack;

const styles = StyleSheet.create({});
