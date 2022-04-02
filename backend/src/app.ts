import express from "express";
import config from "config";

import connectDB from "./utils/connectDB";
import logger from "./utils/logger";
import routes from "./main/routes";

const port = config.get<number>("port");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'))

app.listen(port, async () => {
	logger.info(`http://localhost:${port}`);

	await connectDB();
	routes(app);
});
