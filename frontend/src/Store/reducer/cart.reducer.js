import {
    CART_ITEMS_LIST,
    CART_ITEMS_LIST_SUCCESS,
    CART_ITEMS_LIST_ERR,
    ADD_CART,
    ADD_CART_SUCCESS,
    ADD_CART_ERR
  } from "../type.action";
  
  const initState = {
    loading: false,
    data: null,
    error: null, 
  };
  
  const reducers = (state = initState, { type, values, error }) => {
    switch (type) {
      case CART_ITEMS_LIST:
        return{
          ...state,
          loading : true,
          // data : null,
          error : null
        } 
      case CART_ITEMS_LIST_SUCCESS:
        return{
          ...state,
          loading : false,
          data: values,
          error : null
        }  
      case CART_ITEMS_LIST_ERR:
        return{
          ...state,
          loading : false,
          // data : null,
          error
        }   
      case ADD_CART:
        return{
          ...state,
          loading : true
        }  
      case ADD_CART_SUCCESS:
        return{
          ...state,
          loading : false,
        }
      case ADD_CART_ERR:
        return{
          ...state,
          loading : false
        }     
      default:
        return state;
    }
  };
  
  export default reducers;
  