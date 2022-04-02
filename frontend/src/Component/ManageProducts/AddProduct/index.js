import { Link, useNavigate } from "react-router-dom"
import AdminLayout from "../../Common/Layout/AdminLayout"
import { createProduct } from "../../../Store/action/product.action"
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { productValidationSchema } from "./validation";
import { toast } from "react-toastify";
import { onImageUpload } from "../../../Store/saga/product.saga";

const AddProduct = () => {
    const _productList = useSelector(state => state.productList)
    const dispatch = useDispatch()
    const ListIs = _productList?.data?.data;
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            productName: "",
            description: "",
            quantity: "",
            unitPrice: "",
            productImage: "",
        },
        validationSchema: productValidationSchema,
        onSubmit: (values) => {
            dispatch(createProduct(values, navigate))
        }
    });

    const handleChangeInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }
    const focusInput = (event) => {
        const element = document.getElementById(event.target.name)
        element.classList.add("is-focused")
    }

    const focusOut = (event) => {
        const element = document.getElementById(event.target.name)
        element.classList.remove("is-focused")
    }


    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") {
            const fileData = new FormData()
            fileData.append('file', file)
            const response = await onImageUpload({ values: fileData })
            formik.setFieldValue("productImage", response[0].path) 
        } else {
            toast.error("Please select png, jpg or jpeg image format to upload")
        }

    }
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
                                            <h6 className="text-white text-capitalize ps-3">Add Product</h6>
                                        </div>
                                        <div className="col-6 text-end">
                                            <Link className="btn btn-sm bg-gradient-dark mb-0 me-3 pe-3" to="/manage-products/list"><i className="fa fa-list"></i>&nbsp;&nbsp;Product list</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-4 pb-2">
                                <form className="text-start" >
                                    <div id="productName" className={`input-group input-group-outline ${formik.values.productName ? 'is-filled' : formik.errors.productName && formik.touched.productName ? 'is-filled' : ''} my-3`}>
                                        <label className="form-label">Product Name</label>
                                        <input type="text" className="form-control w-100" name="productName" onFocus={focusInput} onBlur={focusOut} onChange={handleChangeInput} />
                                        {formik.errors.productName && formik.touched.productName && <p className="text-danger px-0 text-sm fw-bold" style={{ marginTop: "0px" }}>{formik.errors.productName}</p>}
                                    </div>
                                    <div id="description" className={`input-group input-group-outline ${formik.values.description ? 'is-filled' : formik.errors.description && formik.touched.description ? 'is-filled' : ''} my-3`}>
                                        <label className="form-label">Product Discription</label>
                                        <input type="text" className="form-control w-100" name="description" onFocus={focusInput} onBlur={focusOut} onChange={handleChangeInput} />
                                        {formik.errors.description && formik.touched.description && <p className="text-danger px-0 text-sm fw-bold" style={{ marginTop: "0px" }}>{formik.errors.description}</p>}
                                    </div>
                                    <div id="quantity" className={`input-group input-group-outline ${formik.values.quantity ? 'is-filled' : formik.errors.quantity && formik.touched.quantity ? 'is-filled' : ''} my-3`}>
                                        <label className="form-label">Product Qty</label>
                                        <input type="text" className="form-control w-100" name="quantity" onFocus={focusInput} onBlur={focusOut} onChange={handleChangeInput} />
                                        {formik.errors.quantity && formik.touched.quantity && <p className="text-danger px-0 text-sm fw-bold" style={{ marginTop: "0px" }}>{formik.errors.quantity}</p>}
                                    </div>
                                    <div id="unitPrice" className={`input-group input-group-outline ${formik.values.unitPrice ? 'is-filled' : formik.errors.unitPrice && formik.touched.unitPrice ? 'is-filled' : ''} my-3`}>
                                        <label className="form-label">Product Price</label>
                                        <input type="text" className="form-control w-100" name="unitPrice" onFocus={focusInput} onBlur={focusOut} onChange={handleChangeInput} />
                                        {formik.errors.unitPrice && formik.touched.unitPrice && <p className="text-danger px-0 text-sm fw-bold" style={{ marginTop: "0px" }}>{formik.errors.unitPrice}</p>}
                                    </div>
                                    <div className="form-group my-3 mx-0 px-0">
                                        <label className="btn bg-gradient-primary" htmlFor="productImage">Upload Image</label>
                                        <input type="file" className="form-control" id="productImage" name="productImage" hidden={true} onChange={handleImageUpload} accept="image/*" />
                                        <p className="muted" style={{ fontSize: 10 }}>only png, jpg and jpeg format supported</p>
                                    </div>

                                    <div className="text-center mb-4">

                                        {_productList.loading ? <button className="btn bg-gradient-primary w-100 my-4 mb-2 d-flex justify-content-center align-items-center" disabled={true}><span className="me-2 d-none">Add </span>Please wait</button>
                                            :
                                            <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2 d-flex justify-content-center align-items-center" onClick={formik.handleSubmit}>Add</button>}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export default AddProduct