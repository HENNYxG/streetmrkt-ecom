import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhGHLJW3fXsd2tP7jvNdo6shq_Ac4IDOE",
    authDomain: "streetmrkt-e511e.firebaseapp.com",
    projectId: "streetmrkt-e511e",
    storageBucket: "streetmrkt-e511e.appspot.com",
    messagingSenderId: "40562872511",
    appId: "1:40562872511:web:c9c3d93a52e295b150760a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
    const userDocRef = doc(db, 'users', userAuth.uid );
    
    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userSnapshot;
};
    
// Check to see if snapshot userdata exisits
//if user does not exist -> add to database (aka set the doc with this object)
//create / set the document with the data from userAuth in my collection

//if user data exists
//return userDocRef

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return; 
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return; 
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);  

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);

    });
    await batch.commit();
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};