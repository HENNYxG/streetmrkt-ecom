import './product-card.styles.scss'
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product
    const { addItemToCart } = useContext(CartContext);

    const addToCartClickHandler = () => {
        addItemToCart(product);
    };
    
    return (
      <div className="product-card-container">
        <img src={imageUrl} alt={`${product.name}`} />
        <div className="footer">
          <span className="name">{name}</span>
          <span className="price">{price}</span>
        </div>
        <Button buttonType="inverted" onClick={addToCartClickHandler}>
          Add to cart
        </Button>
      </div>
    );
};

export default ProductCard;
// card, photo, name, price, add to card button. 
