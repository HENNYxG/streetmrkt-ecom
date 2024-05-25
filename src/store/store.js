import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer';

import logger from 'redux-logger';

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares), 
});

// import { compose, createStore, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage';

// // import { loggerMiddleware } from '../middleware/logger'; (this is more accurate for rerenders)

// import { rootReducer } from './root-reducer';


// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['user']
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)



// const composeEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       trace: true,
//       traceLimit: 25,
//     })) ||
//   compose;
  
// const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(persistedReducer, undefined, composeEnhancers);

// export const persistor = persistStore(store);