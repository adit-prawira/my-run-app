if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// Require Schema of models
require("./models/User");
require("./models/Track");

// require used Libraries
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const app = express();
const mongoUri = process.env.DB_URL;
const requireAuth = require("./middlewares/requireAuth");

const PORT = process.env.PORT ? process.env.PORT : 5000;

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Database");
});

mongoose.connection.on("error", () => {
    console.error("Error connecting to mongo database");
});

app.get("/", requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(PORT, () => {
    console.log("Listening to port 5000");
});
