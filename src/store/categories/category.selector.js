import { createSelector } from "reselect";

//we take the entire redux state and we slice off the part we need, which is categories
const selectCategoryReducer = (state) => state.categories;

//memory selector. Whatever the output of the array is, will be the argument in the function. ex. ([selectCategoryReducer, selectCurrentUser], (categories, currentUser)=> ) 
//createSelector takes 2 arguments: array of input selectors & output selector function.
//the only time this will run is when the categoriesSlice object we get back from the above function is different
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

//Now as long as the catagories array does not change, it won't rerun this method. It will reduce once and always give that previously calculated value.
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);
