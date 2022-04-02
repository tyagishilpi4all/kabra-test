
import {
    PRODUCT_LIST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ERR,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERR, 
  } from "../type.action";
  
  // product list  *************************
  export const productList = (values) => ({
    type: PRODUCT_LIST,
    values
  });
  
  export const productListSuccess = (values) => ({
    type: PRODUCT_LIST_SUCCESS,
    values,
  });
  export const productListErr = (error) => ({
    type: PRODUCT_LIST_ERR,
    error
  });

  // create Product *******************************
  export const createProduct = (values, navigate) => ({
    type: CREATE_PRODUCT,
    values,
    navigate
  })

  export const createProductSuccess = (values) => ({
    type : CREATE_PRODUCT_SUCCESS,
    values
  })

  export const createProductErr = (error) => ({
    type : CREATE_PRODUCT_ERR,
    error
  })

  

  
  