const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes");
const commentsRoutes = require("./routes/comments");

const { PORT, DB_URL, CORS_OPTIONS } = require("./utils/config");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
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