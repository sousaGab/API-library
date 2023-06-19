import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import handler404 from "./middleware/handler404.js";

db.on("error", console.log.bind(console, "Connection Error"));
db.once("open", () => {
	console.log("connection with the data base is successfully");
});
const app = express();
routes(app);

app.use(handler404);

app.use(errorHandler);

export default app;
