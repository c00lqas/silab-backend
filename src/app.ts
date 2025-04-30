import express from "express";
import { errorHandler } from "./middleware/error.middleware";
import AuthRoute from "../src/routes/auth.route";

const app = express();

app.use(express.json());

app.listen(4000);

app.use("/auth", AuthRoute);

app.use(errorHandler);
