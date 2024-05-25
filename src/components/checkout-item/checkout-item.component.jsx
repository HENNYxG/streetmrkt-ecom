import { useDispatch } from "react-redux";

import { removeItemFromCart, addItemToCart, clearItemFromCart } from "../../store/cart/cart.reducer";

import './checkout-item.styles.scss'


const CheckOutItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  const dispatch = useDispatch();



  const removeFromCartHandler = () => {
    dispatch(removeItemFromCart(cartItem));
  }
  const addToCartHandler = () => {
    dispatch(addItemToCart(cartItem));
  };

  const clearFromCartHandler = () => {
    dispatch(clearItemFromCart(cartItem));
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