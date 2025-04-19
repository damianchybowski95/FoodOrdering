import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import { FlatList, View } from "react-native";

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={(item) => {
        return <ProductListItem product={item.item} />;
      }}
      numColumns={2}
      contentContainerStyle = {{ gap : 20, padding : 10 }}
      columnWrapperStyle = {{ gap : 20 }}
    />
  );
}
