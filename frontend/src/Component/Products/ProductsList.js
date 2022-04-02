import Layout from "../Common/Layout"
import product from "../../assets/images/product-placeholder.png"
import { useDispatch, useSelector } from "react-redux";
import { productList, cartItemsList, addToCart } from "../../Store/action/index.action";
import { useEffect } from "react";
import { Baseurl } from "../../Utils/baseurl";
import { getSession } from "../../Utils/helperFunctions";

const ProductsList = () => {

   const _productList = useSelector(state => state.productList)
   const _cartList = useSelector(state => state.cartItemsList)
   const dispatch = useDispatch()
   const ListIs = _productList?.data?.data

   const getProductList = () => {
      dispatch(productList())
   }

   useEffect(() => {
      getProductList()
   }, [])


   const handleAddToCart = (productId) => {
      let inCartQty = _cartList.data?.data?.find(el => el.productId == productId)?.pQuantity || 0;
      dispatch(addToCart({ productId, sessionId: getSession(), pQuantity: inCartQty + 1 }))
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
                     Our <span>products</span>
                  </h2>
               </div>
               <div className="row">
                  {_productList?.loading ?
                     <div className="text-center w-100">
                        <div class="spinner-grow" role="status">
                           <span class="sr-only">Loading...</span>
                        </div>
                     </div>
                     :
                     ListIs?.length > 0 ?
                        ListIs.map((obj, index) => {
                           return (
                              <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                                 <div className="box">
                                    <div className="option_container">
                                       <div className="options">
                                          <button className="btn btn-primary cursor-pointer" disabled={_cartList?.loading} onClick={() => handleAddToCart(obj._id)}>
                                             Add to cart
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
                                          $ {obj?.unitPrice}
                                       </h6>
                                    </div>
                                 </div>
                              </div>
                           )
                        }) :
                        <div className="text-center w-100">No products found.</div>
                  }
               </div>
            </div>
         </section>
      </Layout>
   )
}

export default ProductsList
