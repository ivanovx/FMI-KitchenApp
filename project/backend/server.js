const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://0.0.0.0:27017/kitchen";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger(":method :url :status :res[content-length] - :response-time ms"));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

async function runServer() {
    await mongoose.connect(DB_URL);
}

runServer().then(() => {
    console.log(`MongoDb Connection extablished to ${DB_URL}.`);
    app.listen(PORT, () => console.log(`Application listening at http://localhost:${PORT}`));
}).catch(err => console.log(err));