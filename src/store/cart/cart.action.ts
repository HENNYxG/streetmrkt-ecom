import { CATEGORIES_ACTION_TYPES, CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};



export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, boolean>;

export type UpdateCartItems = ActionWithPayload<CART_ACTION_TYPES.UPDATE_CART_ITEMS, CartItem[]>;



 export const setIsCartOpen = withMatcher(
   (bool: boolean): SetIsCartOpen =>
     createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, bool)
 );

 export const updateCartItems = withMatcher(
   (cartItems: CartItem[]): UpdateCartItems =>
     createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, cartItems)
 );

  export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
     const newCartItems = addCartItem(cartItems, productToAdd);
     return updateCartItems(newCartItems);
   };

   export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
     return updateCartItems(newCartItems);
   };

   export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
     const newCartItems = clearCartItem(cartItems, cartItemToClear);
     return updateCartItems(newCartItems);
   };