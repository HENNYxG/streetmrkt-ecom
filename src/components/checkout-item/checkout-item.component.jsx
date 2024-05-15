import './checkout-item.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';



const CheckOutItem = ({ cartItem }) => {
  const { id, name, quantity, imageUrl, price } = cartItem;
  const { removeItemFromCart, addItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const removeFromCart = () => {
    removeItemFromCart(cartItem)
  }
  const addToCart = () => {
    addItemToCart(cartItem);
  };

  const clearFromCart = () => {
    clearItemFromCart(cartItem);
  };

    return (
      <div className="checkout-item-container">
        <div className="image-container">
          <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div className="arrow" onClick={removeFromCart}>&#10094;</div>
          <span className="value">{quantity}</span>
          <div onClick={addToCart} className="arrow">&#10095;</div>
        </span>
        <span className="price">${price}</span>

        <div className="remove-button" onClick={clearFromCart}>
          &#10005;
        </div>
      </div>
    );
};

export default CheckOutItem;