import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};





 export const setIsCartOpen = (bool) => ({
      type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN,
      payload: bool,
 });
    

  export const addItemToCart = (cartItems, productToAdd) => {
     const newCartItems = addCartItem(cartItems, productToAdd);
     return ({type:CART_ACTION_TYPES.UPDATE_CART_ITEMS , payload: newCartItems})
   };

   export const removeItemFromCart = (cartItems, cartItemToRemove) => {
     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
     return ({type:CART_ACTION_TYPES.UPDATE_CART_ITEMS , payload: newCartItems})
   };

   export const clearItemFromCart = (cartItems, cartItemToClear) => {
     const newCartItems = clearCartItem(cartItems, cartItemToClear);
     return ({type:CART_ACTION_TYPES.UPDATE_CART_ITEMS , payload: newCartItems})
   };