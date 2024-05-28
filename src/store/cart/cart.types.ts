import { CategoryItem } from '../categories/category.types'

export enum CART_ACTION_TYPES {
  TOGGLE_IS_CART_OPEN = "cart/TOGGLE_IS_CART_OPEN",
  UPDATE_CART_ITEMS = "cart/UPDATE_CART_ITEMS",
};

export type CartItem = CategoryItem & {
  quantity: number;
}