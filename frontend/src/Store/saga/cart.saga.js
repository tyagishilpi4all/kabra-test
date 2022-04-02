import { put, call } from "redux-saga/effects";
import { getApi, postApi } from "../api-interface/api-interface";
import { 
  cartItemsListSuccess,
  cartItemsListErr,
  addToCartSuccess,
  addToCartErr
} from "../action/cart.action";
import { toast } from "react-toastify";
import { getSession } from "../../Utils/helperFunctions";

// cart items list *************************************

export function* onCartItemsList() { 
  try { 
      const response = yield call(getApi, `/api/cartList?sessionId=${getSession()}`);
      if (response?.status === 200) {
        yield put(cartItemsListSuccess(response.data));
      
    }
  } catch (error) {
    yield put(cartItemsListErr(error.response.data));
    toast.error(error.response.data.message)
  }
}

// add to cart ***************************************

export function* onAddCart(payload) {
  let data = payload.values;
  try {
    if (data) {
      const response = yield call(postApi, `/api/cartItemHandler`, data);
      if (response?.status === 200) {
        yield put(addToCartSuccess(response.data));
        toast.success(response.data.message)        
      }
    }
  } catch (error) {
    yield put(addToCartErr(error.response.data));
    toast.error(error.response.data.message)
  }
}

