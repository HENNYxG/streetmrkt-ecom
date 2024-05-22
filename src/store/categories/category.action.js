import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'


export const fetchCategoriesStart = () => 
    ({ type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START })

export const fetchCategoriesSuccess = (categoriesArray) =>
    ({ type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categoriesArray });

export const fetchCategoriesFailed = (error) =>
({ type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, payload: error });

//thunk action. (a function that returns a function that gets dispatch)

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart);
    console.log('changed to true')

    try {
        const categoriesArray = await getCategoriesAndDocuments("categories");
        dispatch(fetchCategoriesSuccess(categoriesArray));
        console.log("changed to false");
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
}