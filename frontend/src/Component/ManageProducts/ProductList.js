import { Link } from "react-router-dom"
import AdminLayout from "../Common/Layout/AdminLayout"
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../../Store/action/product.action";
import { useEffect } from "react";
import { Baseurl } from "../../Utils/baseurl";
import product from "../../assets/images/product-placeholder.png"


const ProductList = () => {
    const _productList = useSelector(state => state.productList)
    const dispatch = useDispatch()
    const ListIs = _productList?.data?.data
    const getProductList = () => {
        dispatch(productList())
    }

    useEffect(() => {
        getProductList()
    }, [])

    return (
        <AdminLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4" style={{ minHeight: "50vh" }}>
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="text-white text-capitalize ps-3">Product list</h6>
                                        </div>
                                        <div className="col-6 text-end">
                                            <Link className="btn btn-sm bg-gradient-dark mb-0 me-3 pe-3" to="/manage-products/add-product"><i className="fa fa-plus"></i>&nbsp;&nbsp;Add Product</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-0">
                                    {_productList?.loading ?
                                        <div className="text-center w-100">
                                            <div class="spinner-grow" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        <table className="table align-items-center mb-0">
                                            {ListIs?.length ? <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">S. No.</th>
                                                    <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Image</th>
                                                    <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Product Name</th>
                                                    <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Price</th>
                                                </tr>
                                            </thead> : null}

                                            <tbody>
                                                {ListIs?.length ?
                                                    ListIs?.map((obj, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="d-flex px-3 py-1">
                                                                        {index + 1}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div style={{width:80}}>
                                                                    <img className="w-100" src={obj.productImage ? `${Baseurl}/${obj.productImage}` : product} alt="product image" />
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center text-sm">
                                                                    <p className="text-sm font-weight-bold mb-0">{obj?.productName}</p>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <p className="text-sm font-weight-bold mb-0">{obj?.unitPrice}</p>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={4} className="text-center">
                                                            Data not found..
                                                        </td>
                                                    </tr>
                                                }

                                            </tbody>
                                        </table>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export default ProductList