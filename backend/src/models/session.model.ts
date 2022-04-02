import mongoose from "mongoose";

export interface Session extends mongoose.Document {
	sessionId: string;
	createdAt: Date;
	updatedAt: Date;
}
const sessionSchema = new mongoose.Schema<Session>(
	{
		sessionId: {
			type: mongoose.Schema.Types.String
		},
	},
	{
		timestamps: true,
	}
);

const sessionModel =
	mongoose.models.Session ||
	mongoose.model<Session>("Session", sessionSchema);
export default sessionModel;
