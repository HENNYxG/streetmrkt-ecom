import { CATEGORIES_ACTION_TYPES } from "./category.types";


export const fetchCategoriesStart = () => 
    ({ type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START })

export const fetchCategoriesSuccess = (categoriesArray) =>
    ({ type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categoriesArray });

export const fetchCategoriesFailed = (error) =>
({ type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, payload: error });
