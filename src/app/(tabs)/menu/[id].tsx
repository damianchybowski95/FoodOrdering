import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text style={{fontSize : 20 }}>ProductDetailPage - {id}</Text>
    </View>
  )
}

export default ProductDetailPage

const styles = StyleSheet.create({})