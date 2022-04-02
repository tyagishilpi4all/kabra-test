
import {
    CART_ITEMS_LIST,
    CART_ITEMS_LIST_SUCCESS,
    CART_ITEMS_LIST_ERR,
    ADD_CART,
    ADD_CART_SUCCESS,
    ADD_CART_ERR
  } from "../type.action";
  
 
  export const cartItemsList = (values) => ({
    type : CART_ITEMS_LIST,
    values
  })

  export const cartItemsListSuccess = (values) => ({
    type : CART_ITEMS_LIST_SUCCESS,
    values
  })

  export const cartItemsListErr = (error) => ({
    type : CART_ITEMS_LIST_ERR,
    error
  })

  // add to cart ***************************************
  export const addToCart = (values) => ({
    type : ADD_CART,
    values
  })
  
  export const addToCartSuccess = (values) => ({
    type : ADD_CART_SUCCESS,
    values
  })

  export const addToCartErr = (error) => ({
    type : ADD_CART_ERR,
    error
  })

  
  