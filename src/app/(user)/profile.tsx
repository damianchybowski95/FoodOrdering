import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/src/lib/supabase";
import Button from "@/src/components/Button";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ padding: 10, flex: 1, justifyContent : "flex-end" }}>
      <View style={{ flex : 1 }}>
        <Text>Avatar</Text>
        <Text>Email</Text>
        <Text>Profile name</Text>        
      </View>
      <Button
        text="Sign out"
        onPress={async () => await supabase.auth.signOut()}        
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
