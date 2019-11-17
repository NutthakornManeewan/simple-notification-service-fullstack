const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const vapidKeys = require("./config/vapid_key");
console.log(vapidKeys);
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;
app.get("/", (request, response) => {
    response.send("Hello World!");
})

let dummy_database = {
    subscription: null
};

app.post("/save-subscription", async (request, response) => {
    const subscription = request["body"];
    await saveToDatabase(subscription);
    let message = "Add to database successfully!";
    sendNotification(subscription, message);
    response.json({message: "success!"});
})

const saveToDatabase = async (subscription) => {
    dummy_database["subscription"] = subscription;
}

webpush.setVapidDetails(
    "mailto:myuserid@email.com",
    vapidKeys()["vapidPublicKey"],
    vapidKeys()["vapidSecretKey"]
)

const sendNotification = (subscription, dataToSend="") => {
    webpush.sendNotification(subscription, dataToSend);
}

app.listen(PORT, () => console.log("Example app listening on port " + PORT));