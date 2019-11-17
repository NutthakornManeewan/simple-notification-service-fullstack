const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;
app.get("/", (request, response) => {
    response.send("Hello World!");
})

app.listen(PORT, () => console.log("Example app listening on port " + PORT));