import { ActivityIndicator, FlatList, Text } from 'react-native';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { Link, router, Stack, useRouter } from 'expo-router';
import { useMyOrderList } from '@/src/api/orders';

export default function OrdersScreen() {
  const router = useRouter();
 
  const { data : orders, isLoading, error } = useMyOrderList();

  if( isLoading ) return <ActivityIndicator/>
  if ( error ) return <Text>Failed to fetch</Text>

  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}