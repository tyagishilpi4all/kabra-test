import { Express, Request, Response } from "express";
import { createUserSessionHandler } from "../controllers/user.controller";
import { createProductHandler, listProductHandler, cartItemHandler, cartListHandler, updateQuantityHandler } from "../controllers/product.controller"
import { check } from "express-validator";
import { CONSTANTS } from "../utils/constants";
import { filesUploader } from "../controllers/fileupload.controller";

const routes = (app: Express) => {

app.get("/", (req: Request, res: Response) =>
	res.status(200).send("API running")
);

// image upload ********************************************************

app.post("/api/imageUpload", filesUploader ,(req:any,res:any)=>{
	return res.status(200).json(req.files)
   }),


// user session *******************************************************

app.get("/api/userSession", createUserSessionHandler);


// create product *************************************************

app.post(
	"/api/productCreate", 
	[
		check("productName").notEmpty().withMessage(CONSTANTS.MESSAGES.PRODUCT_NAME),
		check("description").notEmpty().withMessage(CONSTANTS.MESSAGES.DESC_REQUIRED),
		check("quantity").notEmpty().withMessage(CONSTANTS.MESSAGES.QUANTITY_REQUIRED).isNumeric().withMessage(CONSTANTS.MESSAGES.SHOULD_NUMBER),
		check("unitPrice").notEmpty().withMessage(CONSTANTS.MESSAGES.UNIT_PRICE_REQUIRED).isNumeric().withMessage(CONSTANTS.MESSAGES.SHOULD_NUMBER),
	],
	createProductHandler
)

// product list *****************************************************

app.get(
	"/api/productList",
	listProductHandler
)

// handle cart item qty or remove item from cart *********************************************************

app.post(
	"/api/cartItemHandler",
	[
		check("productId").notEmpty().withMessage(CONSTANTS.MESSAGES.REQUIRED),
		check("sessionId").notEmpty().withMessage(CONSTANTS.MESSAGES.REQUIRED),
		check("pQuantity").notEmpty().withMessage(CONSTANTS.MESSAGES.QUANTITY_REQUIRED).isNumeric().withMessage(CONSTANTS.MESSAGES.SHOULD_NUMBER)
	],
	cartItemHandler
)

// cart list ************************************************************

app.get(
	"/api/cartList",
	cartListHandler
)

// update cart quantity **********************************************

app.put(
	"/api/upadteCartQuantity",
	[
		check("id").notEmpty().withMessage(CONSTANTS.MESSAGES.REQUIRED),
		check("pQuantity").notEmpty().withMessage(CONSTANTS.MESSAGES.QUANTITY_REQUIRED)
	],
	updateQuantityHandler
)

};

export default routes;

