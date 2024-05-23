import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';


//for a function to work here, we use the CALL keyword. turns yield getCategoriesAndDocuments("categories"); into yield call(getCategoriesAndDocuments, "categories"); 
//instead of dispatch, we use PUT
export function* fetchCategoriesAsync() {
      try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

//this responds to category start. 
//take recieves an action. takeLatest recieves the last action if a bunch are given. (multiple rerenders).
//takeLatest takes the action type it responds to, what it should do.
// this code says when you take the latest categories start action, it will run the async above
export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

//this export is a basically an accumulator that holds all sagas related to the category.
//all() is an effect that runs everything that's inside and only complete when done. this can be an array of funcs or whatever
export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}