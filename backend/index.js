const cookieParser = require("cookie-parser");
const express = require("express");
const router = require("./src/routes/userRoutes");
const DBConnect = require("./src/database/DBConnect");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
DBConnect();
app.use(
  cors({
    origin: process.env.FORNTEND_URI,
    methods: ["GET", "POST", "PATCH"],
  })
);
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

app.use("/api/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
