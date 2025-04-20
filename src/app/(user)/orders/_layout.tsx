import React from 'react'
import { Stack } from 'expo-router'

const OrderLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title : "Orders"}} />
      {/* <Stack.Screen name="[id]" options={{title : "Order"}} /> */}
    </Stack>
  )
}

export default OrderLayout