import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/category.action";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import "./shop.styles.scss";



const Shop = () => {
  const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchCategoriesStart());
      console.log("fetch was dispatched");
    }, [dispatch]);
  
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
   </Routes>
  );
};

export default Shop;
