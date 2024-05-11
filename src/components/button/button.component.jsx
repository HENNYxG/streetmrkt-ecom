/* 3 states

Default
Inverted
Google sign-in

*/
import "./button.styles.scss"

const buttonTypeClasses = {
    inverted: 'inverted',
    google: 'google-sign-in',
};

const Button = ({children, buttonType, ...otherProps }) => {
    return (
        <button className={`button-container ${buttonTypeClasses[buttonType]}`} {...otherProps}> 
        {children}
        </button>
    );
};

export default Button;


/* 
We get passed the button type from a prop, which will be matched with it's associated class name. Then it gets added
as a style + any other properties we send with it. 
*/ 