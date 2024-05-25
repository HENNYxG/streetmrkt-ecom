/* 3 states

Default
Inverted
Google sign-in

*/
import "./button.styles.scss"

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    inverted: "inverted",
    google: "google-sign-in",
};

const Button = ({children, buttonType, isLoading, ...otherProps }) => {
    return (
      <button
        className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} disabled={isLoading} {...otherProps}>
        {isLoading ? <div className="button-spinner-container"/> : children}
      </button>
    );
};

export default Button;


/* 
We get passed the button type from a prop, which will be matched with it's associated class name. Then it gets added
as a style + any other properties we send with it. 
*/ 