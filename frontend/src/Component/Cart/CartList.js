import Layout from "../Common/Layout"
import product from "../../assets/images/product-placeholder.png"

import { cartItemsList } from "../../Store/action/cart.action"
import { useDispatch, useSelector } from "react-redux";
import { Baseurl } from "../../Utils/baseurl";
import { addToCart } from "../../Store/action/cart.action";
import { getSession } from "../../Utils/helperFunctions";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartList = () => {
    const _cartList = useSelector(state => state.cartItemsList)
    const [isUpdate, setIsUpdate] = useState(false)
    const cart = _cartList.data?.data
    const dispatch = useDispatch()
    const handleAddToCart = (productId, action) => {
        setIsUpdate(true)
        let inCartQty = _cartList.data?.data?.find(el => el.productId == productId)?.pQuantity || 0;
        dispatch(addToCart({ productId, sessionId: getSession(), pQuantity: action == "addQty" ? inCartQty + 1 : action == "removeQty" ? inCartQty - 1 : 0 }))
        setTimeout(() => {
            dispatch(cartItemsList())
        }, [500])
    }
    return (
        <Layout>
            <section className="product_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Your <span>Cart</span>
                        </h2>
                    </div>
                    <div className="row">
                        {_cartList?.loading && !isUpdate ?
                            <div className="text-center w-100">
                                <div class="spinner-grow" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
                            cart?.length > 0 ?
                                cart.map((obj, index) => {
                                    return (
                                        <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                                            <div className="box">
                                                <div className="option_container">
                                                    <div className="options">
                                                        <button className="btn btn-primary w-100 mb-2" disabled={_cartList?.loading} onClick={() => handleAddToCart(obj.productId, 'addQty')}>
                                                            +
                                                        </button>
                                                        <button className="btn bg-dark text-white w-100 mb-2" disabled={_cartList?.loading} onClick={() => handleAddToCart(obj.productId, 'removeQty')}>
                                                            -
                                                        </button>
                                                        <button className="btn btn-danger w-100" disabled={_cartList?.loading} onClick={() => handleAddToCart(obj.productId, 'removeProduct')}>
                                                            Remove
                                                        </button>

                                                    </div>
                                                </div>
                                                <div className="img-box">
                                                    <img src={obj.productImage ? `${Baseurl}/${obj.productImage}` : product} alt="product image" />
                                                </div>
                                                <div className="detail-box">
                                                    <h5>
                                                        {obj?.productName}
                                                    </h5>
                                                    <h6>
                                                        $ {obj?.unitPrice} X {obj.pQuantity}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                }) :
                                <div className="text-center w-100">
                                    <div className="text-center w-100 mb-4">No products found.</div>
                                    <Link to="/" className="btn btn-primary mb-2">
                                        Shop now
                                    </Link>
                                </div>
                        }

                    </div>
                    {cart?.length
                        ?
                        <div className="row">
                            <div className="col-12 d-flex justify-content-between mt-4 options">
                                <h2 className="mb-4">Total Cart Value  <div className="badge bg-dark text-white">$ {_cartList.data.cartTotal}</div></h2>
                                <button className="btn btn-primary" onClick={() => { alert("Comming soon.") }}>
                                    Checkout
                                </button>
                            </div>
                        </div>
                        : null}
                </div>
            </section>
        </Layout>
    )
}

export default CartList
