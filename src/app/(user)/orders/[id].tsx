import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
// import orders from '@/assets/data/orders';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { useOrderDetails } from '@/src/api/orders';
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions';

const OrderDetailScreen = () => {
  const { id : idString } = useLocalSearchParams();
  const id = typeof idString === "string" ? idString : idString[0];
  
  const { data : order, isLoading, error } = useOrderDetails(parseFloat(id));
  useUpdateOrderSubscription(parseFloat(id));

  if(isLoading) return <ActivityIndicator/>
  if(error) return <Text>Failed to fetch</Text>

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: order ? `Order #${order.id}` : "Order" }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;