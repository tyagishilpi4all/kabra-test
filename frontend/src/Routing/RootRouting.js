import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import CartList from "../Component/Cart/CartList";
import AddProduct from "../Component/ManageProducts/AddProduct";
import ProductList from "../Component/ManageProducts/ProductList";
import ProductsList from '../Component/Products/ProductsList';
import { cartItemsList } from "../Store/action/index.action";
import { onCreateSession } from "../Store/saga/createSession";

const RootRouting = (props) => {
    const dispatch = useDispatch()

    const getCart = () => {
        dispatch(cartItemsList())
    }

    const handleCreateSession = async () => {
        const response = await onCreateSession() 
    }
    useEffect(() => {
        handleCreateSession()
        setTimeout(() => {
            getCart()
        }, [500])

    }, [])
    const RouteDetails = [
        { path: "/", componentIs: ProductsList },
        { path: "/cart", componentIs: CartList },
        { path: "/manage-products/list", componentIs: ProductList },
        { path: "/manage-products/add-product", componentIs: AddProduct }
    ]
    return (
        <Routes>
            {RouteDetails.map((obj, index) => {
                return (
                    <Route path={obj.path} element={<obj.componentIs key={index} />} key={obj.path} />
                )
            })}
        </Routes>
    )
}

export default RootRouting;