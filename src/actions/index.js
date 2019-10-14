import products from '../data/products.json';
import {GET_DATA, FILTERS, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_PRODUCTS_ITEMS} from './../constants/index';

export function getProductsData() {
  return {
    type: GET_DATA,
    payload: products,
    // sizes: products.sizes
  }
}

export function filters(size, price) {
  return { 
    type: FILTERS, 
    size: size,
    price: price,
    data: products
  };
}

export function addItemToCart(item) {
  return { 
    type: ADD_ITEM_TO_CART, 
    payload: item,
    data: products
  };
}

export function removeItemFromCart(item) {
  return { 
    type: REMOVE_ITEM_FROM_CART, 
    payload: item,
    data: products
  };
}

export function updateProductsItems(item) {
  return { 
    type: UPDATE_PRODUCTS_ITEMS, 
    payload: item,
    data: products
  };
}