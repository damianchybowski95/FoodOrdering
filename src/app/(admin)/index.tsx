import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const TabsIndex = () => {
  return (
    <Redirect href={`/(admin)/menu`}/>
  )
}

export default TabsIndex

const styles = StyleSheet.create({})