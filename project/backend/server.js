const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes");
const commentsRoutes = require("./routes/comments");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://0.0.0.0:27017/kitchen";

const CORS_OPTIONS = {
    origin: "http://localhost:3000"
};

const app = express();

//app.use(bodyParser.json());
app.use(express.json({ limit: '20mb' }));
app.use(cors(CORS_OPTIONS));
app.use(logger(":method :url :status :res[content-length] - :response-time ms"));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/recipes", recipesRoutes);
app.use("/comments", commentsRoutes);

mongoose.connect(DB_URL).then(() => {
    console.log(`MongoDb Connection extablished to ${DB_URL}.`);

    app.listen(PORT, () => {
        console.log(`Application listening at http://localhost:${PORT}`)
    });
}).catch(err => {
    console.log(err);
});