import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { removeItemFromCart, addItemToCart, clearItemFromCart } from "../../store/cart/cart.action";

import './checkout-item.styles.scss'


const CheckOutItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)


  const removeFromCartHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
  }
  const addToCartHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem));
  };

  const clearFromCartHandler = () => {
    dispatch(clearItemFromCart(cartItems, cartItem));
  };

    return (
      <div className="checkout-item-container">
        <div className="image-container">
          <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div className="arrow" onClick={removeFromCartHandler}>&#10094;</div>
          <span className="value">{quantity}</span>
          <div onClick={addToCartHandler} className="arrow">&#10095;</div>
        </span>
        <span className="price">${price}</span>

        <div className="remove-button" onClick={clearFromCartHandler}>
          &#10005;
        </div>
      </div>
    );
};

export default CheckOutItem;