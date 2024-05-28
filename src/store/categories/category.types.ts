export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
};


export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export type Category = {
  title: string;
  imageURL: string;
  items: CategoryItem[];
}

export type CategoryMap = {
  [key: string]: CategoryItem[];
}
//this says that the key can be any string (its based on the category name which is a string) but the value is def an array of CategoryItem's