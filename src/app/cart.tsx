import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { CartContext } from '@/src/providers/CartProvider'
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {

  const { items, totalCost } = useContext(CartContext);

  return (
    <View style={{ padding : 10 }}>
      <FlatList data={items} renderItem={({item})=>{
        return <CartListItem key={item.id} cartItem={item}/>
      }}
      contentContainerStyle={{ padding : 10, gap : 10}}/>
      
      <Text style={{ marginTop : 20, fontWeight : "500", fontSize : 20 }}>Total: ${totalCost}</Text>
      <Button text='Checkout'/>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({})