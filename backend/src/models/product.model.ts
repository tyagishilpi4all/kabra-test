import mongoose from "mongoose";

export interface Product extends mongoose.Document {
	productName: string;
    productImage : string;
    description : String;
    quantity : Number;
    unitPrice : Number;
    isActive : Boolean;
	createdAt: Date;
	updatedAt: Date;
}
const productSchema = new mongoose.Schema<Product>(
	{
		productName: {
			type: mongoose.Schema.Types.String
		},
        productImage : {
            type: mongoose.Schema.Types.String
        },
        description : {
            type: mongoose.Schema.Types.String
        },
        quantity : {
            type: mongoose.Schema.Types.Number
        },
        unitPrice : {
            type: mongoose.Schema.Types.Number
        },
        isActive : {
            type: mongoose.Schema.Types.Boolean,
            default : true
        }
	},
	{
		timestamps: true,
	}
);

const productModel =
	mongoose.models.Product ||
	mongoose.model<Product>("Product", productSchema);
export default productModel;
