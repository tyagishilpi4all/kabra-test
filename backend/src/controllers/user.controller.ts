import { Request, Response } from "express";
import logger from "../utils/logger";
import SessionModel from "../models/session.model";
import { generateRandomKey } from "../utils/helperFunctions";

// user session ****************************************

export const createUserSessionHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const session = generateRandomKey(128)
		const userSession = await SessionModel.create({sessionId : session})
		if(userSession){
			res.status(200).send({status : 1, data : userSession});
		}
	} catch (err: any) {
		logger.error(err);
		res.status(409).send(err.message);
	}
};
