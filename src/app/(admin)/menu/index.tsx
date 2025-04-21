import products from "@/assets/data/products";
import { useProductList } from "@/src/api/products";
import ProductListItem from "@/src/components/ProductListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function MenuScreen() {

    const { data, error, isLoading } = useProductList();
  
    if( isLoading ) 
      return <ActivityIndicator/>
    
    if( error ) 
      return <Text>Failed to fetch the products</Text>

  return (
    <FlatList
      data={data}
      renderItem={(item) => {
        return <ProductListItem product={item.item} />;
      }}
      numColumns={2}
      contentContainerStyle = {{ gap : 20, padding : 10 }}
      columnWrapperStyle = {{ gap : 20 }}
    />
  );
}
