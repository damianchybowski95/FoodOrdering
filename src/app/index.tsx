import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";

const index = () => {
  const { session, loading, isAdmin, profile } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/login"} />;
  }

  if ( isAdmin ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Link href={'/(user)'} asChild>
          <Button text="User" />
        </Link>
        <Link href={'/(admin)'} asChild>
          <Button text="Admin" />
        </Link>
        <Button text="Sign out" onPress={ () => supabase.auth.signOut() }/>
      </View>
    );
  }

  return (
    <Redirect href={"/(user)"} />
  );
};

export default index;
