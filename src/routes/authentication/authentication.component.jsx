import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss'
import '../../components/button/button.styles.scss'

export const logGoogleUser = async () => {
    try {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user)
    } catch(error) {
        alert(error.message)
    }
}

const Authentication = () => {
useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user) };
        console.log(response);
    },
    []
  );

    return(
        <div className='authentication-container'>
            <h1>Sign in page</h1>
            <SignInForm />
            <button className='button-container' onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </div>
    );
};
export default Authentication

