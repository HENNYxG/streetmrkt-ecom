import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    );
  }
  return [...cartItems, {...productToAdd, quantity: 1}]
}


const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

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

export const CART_ACTION_TYPES = {
  TOGGLE_IS_CART_OPEN: "TOGGLE_IS_CART_OPEN",
  UPDATE_CART_ITEMS: "UPDATE_CART_ITEMS"
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {

    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    
    case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
      return {
        ...state,
        cartItem: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartQuantity: 0,
  cartTotal: 0,
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartQuantity, cartTotal } = state;

  
  const setIsCartOpen = (bool) => {
    dispatch({
      type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN,
      payload: bool
    });
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartQuantity = cartQuantityHelper(newCartItems);
    const newCartTotal = updateCartTotal(newCartItems);
    dispatch({
      type: CART_ACTION_TYPES.UPDATE_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartQuantity: newCartQuantity,
        cartTotal: newCartTotal,
      },
    });
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd); 
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
     const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  }

    const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      cartItems,
      cartQuantity,
      cartTotal,
      removeItemFromCart,
      clearItemFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};
 