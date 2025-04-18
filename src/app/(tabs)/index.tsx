import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import { View } from "react-native";

const product = products[0];

export default function TabOneScreen() {
  return (
    <View>
      <ProductListItem product={products[0]}/>
      <ProductListItem product={products[1]}/>
    </View>
  );
}


