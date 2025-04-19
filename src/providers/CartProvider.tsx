import { createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  totalCost : number
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  totalCost : 0
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  const addItem = (product: Product, size: CartItem["size"]) => {
    // If allready in a cart increment quantity
    const existingItem = items.find( (item) => item.product === product && item.size === size )
    if( existingItem ){
        updateQuantity( existingItem.id, 1);
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
    const itemsWithUpdatedQuantity = items.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + amount } : item
    ).filter((item) => item.quantity > 0 );
    setItems(itemsWithUpdatedQuantity);
  };

  // Czemu renderuje przy każdej zmianie zależności, gdy nie jest użyte z useState, ani useEffect???
  // Problem typu : działa, ale nie wiem dlaczego.
  const totalCost = items.reduce((sum, item) => ( sum += item.product.price * item.quantity ), 0);

  return (
    <CartContext.Provider
      value={{
        items: items,
        addItem: addItem,
        updateQuantity: updateQuantity,
        totalCost : totalCost
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
