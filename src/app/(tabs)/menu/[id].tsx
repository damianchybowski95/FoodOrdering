import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";

const sizes: Array<"S" | "M" | "L" | "XL"> = ["S", "M", "L", "XL"];

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<(typeof sizes)[number]>("M");

  const product = products.find((p) => p.id.toString() === id);

  // Cart context provider
  const { items, addItem } = useCart();

  function addToCart(){
    console.log("Add to cart clicked");
    if( !product ) return
    addItem( product, selectedSize )
    router.push("/cart");
    return ""
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }}
      />
      <Text>Select size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => {
          return (
            <Pressable
              onPress={()=>{
                setSelectedSize(size);
              }}
              key={`view-${size}`}
              style={[
                styles.size,
                {
                  backgroundColor:
                    selectedSize === size ? "gainsboro" : "white",
                },
              ]}
            >
              <Text
                key={`text-${size}`}
                style={[
                  styles.sizeText,
                  { color: selectedSize === size ? "black" : "grey" },
                ]}
              >
                {size}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button onPress={addToCart} text="Add to cart"/>
    </View>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop : "auto"
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    // backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: 500,
  },
});
