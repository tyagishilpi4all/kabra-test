import { put, call } from "redux-saga/effects";
import { getApi, postApi, fileUpload } from "../api-interface/api-interface";
import {
  productListSuccess,
  productListErr,
  createProductSuccess,
  createProductErr
} from "../action/product.action";
import { toast } from "react-toastify";
import { getSession } from "../../Utils/helperFunctions";
// import { toast } from "react-toastify";
// import { setToken } from "../../utils/constants";

// product list ***********************************
export function* onProductList(payload) {
  let data = payload.values;
  try {
    const response = yield call(getApi, `/api/productList`);
    if (response?.status === 200) {
      yield put(productListSuccess(response.data));
      // toast.success(response.data.message)
    }
  } catch (error) {
    yield put(productListErr(error.response.data));
    toast.error(error.response.data.message)
  }
}

// create Product *****************************************

export function* onCreateProduct(payload) {
  let data = payload.values;
  const navigate = payload.navigate;
  try {
    if (data) {
      const response = yield call(postApi, `/api/productCreate`, data);
      if (response?.status === 200) {
        yield put(createProductSuccess(response.data));
        toast.success(response.data.message)
        navigate("/manage-products/list")
      }
    }
  } catch (error) {
    yield put(createProductErr(error.response.data));
    toast.error(error.response.data.message)
  }
}

export async function onImageUpload(payload) {
  let data = payload.values;
  try {
    if (data) {
      const response = await fileUpload(`/api/imageUpload`, data);
      if (response?.status === 200) {
        toast.success("Image uploaded")
        return response.data
      }
    }
  } catch (error) {
    // yield put(addToCartErr(error.response.data));
    toast.error(error.response.data.message)
  }
}