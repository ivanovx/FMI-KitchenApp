const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://0.0.0.0:27017/kitchen";

const CORS_OPTIONS = {
    origin: "http://localhost:3000"
};

const app = express();

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(logger(":method :url :status :res[content-length] - :response-time ms"));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/recipes", recipesRoutes);

async function runServer() {
    await mongoose.connect(DB_URL);
}

runServer().then(() => {
    console.log(`MongoDb Connection extablished to ${DB_URL}.`);
    app.listen(PORT, () => console.log(`Application listening at http://localhost:${PORT}`));
}).catch(err => console.log(err));