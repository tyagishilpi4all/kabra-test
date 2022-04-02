import mongoose from "mongoose";

export interface AddCart extends mongoose.Document {
	productId: string;
    sessionId : string;
    pQuantity : Number;
    isActive : Boolean;
	createdAt: Date;
	updatedAt: Date;
}
const addCartSchema = new mongoose.Schema<AddCart>(
	{
		productId: {
			type: mongoose.Schema.Types.String
		},
        sessionId : {
            type: mongoose.Schema.Types.String
        },
        pQuantity : {
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

const addCartModel =
	mongoose.models.AddCart ||
	mongoose.model<AddCart>("addCart", addCartSchema);
export default addCartModel;
