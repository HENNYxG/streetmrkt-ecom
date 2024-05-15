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


const removeCartItem = (cartItems, cartItemToRemove) => {
  //find Cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartItems with one of them having reduced quantity
   return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
    );
  }

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
  }




const cartQuantityHelper = (cartItems) => {
  return cartItems.reduce(
    (accumulator, currentElement) => accumulator + currentElement.quantity,
    0
  );
};
  

  const updateCartTotal = (cartItems) => {
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
  };

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartQuantity: 0,
  removeItemFromCart: () => { },
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartQuantity(cartQuantityHelper(cartItems));
  }, [cartItems])
  
  useEffect(() => {
      setCartTotal(updateCartTotal(cartItems));
  }, [cartItems]);



  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd)); 
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }

    const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      cartItems,
      cartQuantity,
      setCartItems,
      cartTotal,
      removeItemFromCart,
      clearItemFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};
 