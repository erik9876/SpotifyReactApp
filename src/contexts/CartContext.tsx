import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define the item types
type ItemType = "artist" | "track";

// Define the shape of an item
interface Item {
  id: string;
  type: ItemType;
  name: string;
  // Add additional properties as necessary
}

// Define the shape of the cart state
interface CartState {
  items: Item[];
}

// Define the actions for the reducer
type CartAction =
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "REMOVE_ITEM"; payload: { id: string } };

// Define the shape of the context
interface CartContextType {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

// Create the cart context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer to handle actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

// Context Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Function to add items to the cart
  const addItem = (item: Item) => {
    console.log("Adding item to cart:", item);
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  // Function to remove items from the cart
  const removeItem = (id: string) => {
    console.log("Removing item from cart:", id);
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
