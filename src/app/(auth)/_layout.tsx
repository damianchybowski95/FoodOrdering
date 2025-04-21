import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/src/providers/AuthProvider'

const AuthLayout = () => {
  const { session } = useAuth();
  
  if( session ) {
    return <Redirect href={"/"} />
  }

  return (
    <Stack>
        <Stack.Screen name="login" options={{ title : "Login" }}/>
        <Stack.Screen name="signup" options={{ title : "Sign up" }}/>
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})