import { AnyAction } from "redux";

import { updateCartItems, setIsCartOpen } from "./cart.action";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[],
}

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE , action: AnyAction ): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (updateCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;

};


