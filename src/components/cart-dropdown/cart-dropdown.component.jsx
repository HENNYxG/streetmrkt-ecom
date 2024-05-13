import './cart-dropdown.styles.scss'
import Button from '../button/button.component';


const CardDropdown = () => {

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-item' />
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
};

export default CardDropdown;

//context related to the items in the cart and whether it is open or not
/*
cart
toggle state
*/