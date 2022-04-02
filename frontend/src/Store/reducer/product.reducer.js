import {
    PRODUCT_LIST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ERR,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERR, 
  } from "../type.action";
  
  const initState = {
    loading: false,
    data: null,
    error: null,
    dataById: null
  };
  
  const reducers = (state = initState, { type, values, error }) => {
    switch (type) {
      case PRODUCT_LIST:
        return {
          ...state,
          loading: true,
          data: null,
          error: null,
        };
      case PRODUCT_LIST_SUCCESS:
        return {
          ...state,
          data: values,
          loading: false,
          error: null,
        };
      case PRODUCT_LIST_ERR:
        return {
          ...state,
          error,
          loading: false,
        };
      case CREATE_PRODUCT:
        return{
          ...state,
          loading : true
        }  
      case CREATE_PRODUCT_SUCCESS:
        return{
          ...state,
          loading : false
        }  
      case CREATE_PRODUCT_ERR:
        return{
          ...state,
          loading : false
        }    
      default:
        return state;
    }
  };
  
  export default reducers;
  