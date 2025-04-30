import express from "express";

const app = express();

app.use(express.json());

app.listen(4000, "http://localhost", () => {
  console.log("Server run at port 4000");
});
