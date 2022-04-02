import { Request, Response } from "express";
import logger from "../utils/logger";
import ProductModel from "../models/product.model";
import AddCart from "../models/addCart.model"
import { CONSTANTS } from "../utils/constants";
import { validationResult } from "express-validator";
// create product ****************************************

export const createProductHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { productName, description, quantity, unitPrice, productImage } = req.body;
        const data = await ProductModel.findOne({ productName })
        if (data) {
            res.status(200).send({ status: 0, message: CONSTANTS.MESSAGES.PRODUCT_EXIST });
        } else {
            const productIs = await ProductModel.create({
                productName, description, quantity, unitPrice, productImage
            })

            res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.PRODUCT_CREATED });
        }

    } catch (err: any) {
        logger.error(err);
        res.status(409).send(err.message);
    }
};

// product list *****************************************************

export const listProductHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const allProducts = await ProductModel.find({
            isActive: true
        }).sort({ createdAt: -1 })

        if (allProducts?.length > 0) {
            res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.PRODUCT_FETCHED, data: allProducts });
        } else {
            res.status(200).send({ status: 0, message: CONSTANTS.MESSAGES.PRODUCT_NOT_EXIST, data: [] });
        }

    } catch (err: any) {
        logger.error(err);
        res.status(409).send(err.message);
    }
};


// add to cart *********************************************************

export const cartItemHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { productId, sessionId, pQuantity } = req.body;
        const productIs = await AddCart.findOne({
            productId, sessionId
        })
        if (productIs) {
            if (pQuantity == 0) {
                const cartRes = await AddCart.deleteOne({ productId, sessionId })
                if (cartRes) {
                    res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.PRODUCT_REMOVED });
                }
            } else {
                const cartRes = await AddCart.findOneAndUpdate({ productId, sessionId }, { pQuantity })
                if (cartRes) {
                    res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.PRODUCT_QTY_UPDATED });
                }
            }
        } else if (pQuantity) {
            const cartRes = await AddCart.create({
                productId, sessionId, pQuantity
            })
            if (cartRes) {
                res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.PRODUCT_ADDED_CART });
            }
        } else {
            res.status(400).send({ status: 0, message: CONSTANTS.MESSAGES.QTY_REQUIRED });
        }

    } catch (err: any) {
        logger.error(err);
        res.status(409).send(err.message);
    }
};

// cart list **********************************************************

export const cartListHandler = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.query.sessionId) {
            return res.status(400).json({ error: CONSTANTS.MESSAGES.SESSION_ID_REQUIRED });
        }
        const cartListIs = await AddCart.find({
            isActive: true,
            sessionId: req.query.sessionId
        }).sort({ createdAt: -1 })

        if (cartListIs?.length > 0) {
            const data = cartListIs?.map(async (obj: any) => {
                const productData = await ProductModel.findOne({
                    _id: obj.productId
                }).select('productName , productImage ,description, unitPrice ');
                const list = {
                    ...productData._doc,
                    ...obj._doc
                }
                return list
            })

            Promise.all(data).then((data) => {
                let cartTotal = 0;
                for(let i = 0; i < data.length; i++){
                    cartTotal += (data[i].unitPrice * data[i].pQuantity)
                }

                res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.CART_DATA_FETCHED, data, cartTotal });
            })
        } else {
            res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.CART_DATA_FETCHED, data: [] })
        }
    } catch (err: any) {
        logger.error(err);
        res.status(409).send(err.message);
    }
};


// cart quantity update ***************************************************************

export const updateQuantityHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const { id, pQuantity } = req.body;
        const data = await AddCart.findOne({
            _id: id
        }).updateOne({
            '$set': { pQuantity }
        })

        if (data) {
            res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.QUANTITY_UPDTAED });
        } else {
            res.status(200).send({ status: 1, message: CONSTANTS.MESSAGES.QUANTITY_NOT_EXIST });
        }
    } catch (err: any) {
        logger.error(err);
        res.status(409).send(err.message);
    }
};

