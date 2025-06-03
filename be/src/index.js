const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);

// some devices cannot connect to mongodb with this localhost url
// const mongoURI = "mongodb://localhost:27017/todos";

// instead use this url for dev mode
const mongoURI = "mongodb://0.0.0.0/todos";

mongoose
  .connect(mongoURI)
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
