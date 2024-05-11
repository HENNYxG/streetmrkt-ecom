import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'
// import { logGoogleUser } from '../../routes/authentication/authentication.component';



const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const[formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const loginWithGoogle = async () => {
        try {
            const response = await signInWithGooglePopup();
            await createUserDocumentFromAuth(response.user);
        } catch(error) {
        console.log(error)
        };
    };    


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );        
            console.log(response);
        } catch(error) {
            console.log(error.code);
            if(error.code === 'auth/invalid-credential') {
                alert('Wrong email/password combination');
            }
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({...formFields, [name]: value })
        console.log({formFields})
    };

    return(
        <div className='sign-in-container'> 
        <h2> Have an account? </h2>
        <span> Sign in with your email and password</span>
    <form onSubmit={handleSubmit}>
        <FormInput
                label="Email"
                type="email" 
                required 
                onChange={handleChange}
                name="email" 
                value={email}
                />
        <FormInput                 
                label="Password"
                type="password" 
                required 
                onChange={handleChange}
                name="password" 
                value={password}
                />

        <div className='sign-in-btn-wrapper'>
            <Button type='submit' buttonType='default'> Login </Button>
            <Button type='button' buttonType='google' onClick={loginWithGoogle}>Google Sign In</Button>
        </div>   
        </form>
    </div> 
    )
}

export default SignInForm