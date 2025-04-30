import express from "express";
import { errorHandler } from "./middleware/error.middleware";
import AuthRoute from "../src/routes/auth.route";
import SubjectRoute from "../src/routes/subject.route";
import ClassRoute from "../src/routes/class.route";

const app = express();

app.use(express.json());

app.listen(3000);

app.use("/auth", AuthRoute);
app.use("/subject", SubjectRoute);
app.use("/class", ClassRoute);

app.use(errorHandler);
