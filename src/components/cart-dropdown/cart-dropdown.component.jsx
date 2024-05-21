import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";


const CardDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to="/checkout">
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </div>
  );
};

export default CardDropdown;

//context related to the items in the cart and whether it is open or not
/*
on click add to cart, add product object to new array called cart. 
This array will be stored in context
- logic to count how many product duplicates there are, add it to QTY variable
- then display a list of non duplicate products. 
- if removed, then remove it from array.
- if quantity decreases, remove 1 of the 2 from the array.
- if quantity + then add 1 to qauntity

Quantity + - buttons
if object already exists in array then ++ quantity
if qty is > 1 then -- | if 1 then remove from array

product add handler (if not there then add to array with qty 1. if there then ++)
product remove handler (if qty > 1 decrease qty, if 1 then remove from array)

stored in cart state.

*/
