const cors = require("cors");
const express = require("express");
const config = require("../../config.json");

process.env.NODE_ENV = process.argv.includes("--dev")
  ? "development"
  : "production";

const app = express();
app.use(cors());
app.use("/", express.static(__dirname + "/dist"));
app.listen(config.port, () => {
    console.log("Listening to port " + config.port);
    if(process.env.NODE_ENV === "development") {
        require("./webpack.js");
    }
})



app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
})