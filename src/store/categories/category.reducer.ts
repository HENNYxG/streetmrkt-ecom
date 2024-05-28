import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

import { CategoryAction } from "./category.action";

//typing inital state, it's read only. we're importing category from types.
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: true,
    error: null,
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as CategoryAction ) => {
//not all of them have payload so it throws this error, so we undo destructure.

    switch (action.type) {
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
        return { ...state, isLoading: true };
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
        return { ...state, categories: action.payload, isLoading: false };
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
        return { ...state, error: action.payload, isLoading: false };
      default:
        return state;
    }
};

//action = {} as CategoryAction -> This action is only going to be 1 of these 3 action types. This is called a Discriminating Union Pattern