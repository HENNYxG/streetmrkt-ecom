import { createContext, useEffect, useState } from "react";

//add to cart logic
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found already in cart, increment quantity & return
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    );
  }
  // return new array with modified cart items / new cart items
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const cartQuantityHelper = (cartItems) => {
    return cartItems.reduce(
      (accumulator, currentElement) => accumulator + currentElement.quantity,
      0
    );
  };
  

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartQuantity: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    setCartQuantity(cartQuantityHelper(cartItems));
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd)); 
  };

    const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      cartItems,
      cartQuantity,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};
 