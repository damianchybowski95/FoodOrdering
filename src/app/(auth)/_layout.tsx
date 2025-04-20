import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="login" options={{ title : "Login" }}/>
        <Stack.Screen name="signup" options={{ title : "Sign up" }}/>
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})