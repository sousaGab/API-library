import mongoose from "mongoose";

mongoose.connect(process.env.CONNECTION_DB);
let db = mongoose.connection;

export default db;
