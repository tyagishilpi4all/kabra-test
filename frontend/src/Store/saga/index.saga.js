import { takeLatest, all } from "redux-saga/effects";

import {
    PRODUCT_LIST,
    CREATE_PRODUCT,
    CART_ITEMS_LIST,
    ADD_CART
} from "../type.action";
import { onProductList, onCreateProduct } from "./product.saga";
import { onCartItemsList, onAddCart } from "./cart.saga";

function* sagas() {
  yield all([
    takeLatest(PRODUCT_LIST, onProductList),
    takeLatest(CREATE_PRODUCT, onCreateProduct),
    takeLatest(CART_ITEMS_LIST, onCartItemsList),
    takeLatest(ADD_CART, onAddCart)
  ]);
}

export default sagas;
