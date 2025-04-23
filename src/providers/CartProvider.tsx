import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { Database, Tables } from "../database.types";
import { useInsertOrderItems } from "../api/order_items";

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<"products">, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  totalCost: number;
  checkout: () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  totalCost: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems, error : useInsertOrderItemsError } = useInsertOrderItems();
  const router = useRouter();

  const addItem = (product: Tables<"products">, size: CartItem["size"]) => {
    // If allready in a cart increment quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      product: product,
      product_id: product.id,
      quantity: 1,
      size: size,
      id: randomUUID(), // Generate id instead
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const itemsWithUpdatedQuantity = items
      .map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0);
    setItems(itemsWithUpdatedQuantity);
  };

  // Czemu renderuje przy każdej zmianie zależności, gdy nie jest użyte z useState, ani useEffect???
  // Problem typu : działa, ale nie wiem dlaczego.
  const totalCost = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  // Zaokrąglenie do dwóch miejsc po przecinku ma rozwiązać problem niedokładności floatów w JavaScripcie.
  // Nie wiem czy tak się to robi właściwie.
  const roundedTotalCost = parseFloat(totalCost.toFixed(2));

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    console.log("Checkout has been called...");
    insertOrder(
      { total: totalCost },
      {
        onSuccess: (data) => {
          console.log("data from checkout functions success", data);
          saveOrderItems(data);
        },
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    console.log("saveOrderItems...");
    const orderItems = items.map((item) => {
      return {
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
      };
    });
    console.log("Order items : ", orderItems);

    insertOrderItems(orderItems, {
      onSuccess() {
        console.log("InsertOrderItems-on success");
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        items: items,
        addItem: addItem,
        updateQuantity: updateQuantity,
        totalCost: roundedTotalCost,
        checkout: checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
