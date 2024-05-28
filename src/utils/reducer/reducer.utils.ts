//export const createAction = (type, payload) => ({ type, payload });
//not in use

import { AnyAction } from "redux";

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

//if we pass 2 params, 

//Defines type 1. ActionWithPayload is the expected type when T & P are passed as parameters.
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

//Defines type 2
//To overload Functions, you need the same number of parameters. Thats why we pass the payload: void. 
export function createAction<T extends string>(type: T, payload: void): Action<T>;

// Defines implementation
export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload }; 
}

//T is a enum so it extends string 