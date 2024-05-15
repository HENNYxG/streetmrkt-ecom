import { createContext, useState } from "react";

// const addCartItem = (productToAdd) => {
//     const virtualCart = cartItems;
//     const cartSearch = cartItems.filter((product) => {
//         return product.id.includes(productToAdd.id);
//     }) 

//     if (cartSearch.count == 0) {
//         const newCartItem = {
//             id: productToAdd.id,
//             name: productToAdd.name,
//             imageUrl: productToAdd.imageUrl,
//             price: productToAdd.price,
//             quantity: 1,
//         }
//         virtualCart.push(newCartItem);
//         setCartItems(virtualCart);

//     } else if (cartSearch.count > 1) {
//         const foundIndex = virtualCart.findIndex(x => x.id == cartSearch.id);
//         virtualCart[foundIndex].quantity++;
//         setCartItems(virtualCart);
//     }
    // search for item in array using ID 
    // if does not exist, build new object using it's values but add new quantity field. 

    // if does exist.incrememnt quantity inside the existing array
    // SetCartItems state to new array 
    
//}
const CART = [
  {
    id: 1,
    name: "Brown Brim",
    imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    price: 25,
    quantity: 1,
  },
  {
    id: 2,
    name: "Blue Beanie",
    imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
    price: 18,
    quantity: 1,
  },
  {
    id: 3,
    name: "Brown Cowboy",
    imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
    price: 35,
    quantity: 1,
  },
];

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  setCartItems: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(CART);
    // console.log(cartItems)

    const addItemToCart = (productToAdd) => {
            const virtualCart = cartItems;
            const cartSearch = []
            const cartSearchTwo = virtualCart.find(product => product.id === productToAdd.id);
            cartSearch.push(cartSearchTwo)
            console.log(cartSearch); 

        if (cartSearchTwo == undefined) {
          console.log("step 1");
          const newCartItem = {
            id: productToAdd.id,
            name: productToAdd.name,
            imageUrl: productToAdd.imageUrl,
            price: productToAdd.price,
            quantity: 1,
          };
          virtualCart.push(newCartItem);
          console.log(virtualCart);
          console.log(newCartItem);
            setCartItems(virtualCart);
                        console.log(cartItems);
        } else if (cartSearch.length >= 1) {
            console.log("we here");
           // const targetId = cartSearch[0].id

            cartSearchTwo.quantity++;
            console.log(cartSearchTwo);

          const index = cartItems.findIndex(
            (product) => product.id === productToAdd.id
          );
            virtualCart.splice(index, 1, cartSearchTwo);
          //   virtualCart[foundIndex].price++
            setCartItems(virtualCart);
            console.log(cartItems)
        }

    }


    const value = {
      addItemToCart,
        setCartItems,
        cartItems,
      isCartOpen,
      setIsCartOpen,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};
 