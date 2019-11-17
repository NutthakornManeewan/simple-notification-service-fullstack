
const urlB64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const saveSubscription = async (subscription) => {
    const SERVER_URL = "http://localhost:4000/save-subscription";
    const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    });
    return response;
}

self.addEventListener("activate", async () => {
    console.log("Service worker activated!");
    try {
        const applicationServerKey = urlB64ToUint8Array("BMVuRzy5TCi_nKuLSXHd_b2yszJvIWE5bkoOEE78USySizBZO7AOnra_j3L5kr9dPoo2QcVErWaDZ0dYjVVTUfc");
        const options = {
            applicationServerKey,
            userVisibleOnly: true
        };
        console.log("Response >>>", options);
        const subscription = await self.registration.pushManager.subscribe(options);
        const response = await saveSubscription(subscription);
        console.log("Response >>>", response);
    } catch (error) {
        console.log("Service.js error >>>", error);
    }
});

self.addEventListener("push", (event) => {
    if(!!event.data) {
        console.log("Push event >>>", event.data.text());
        showLocalNotification("Yolo", event.data.text(), self.registration);
    } else {
        console.log("Push event but no data!");
    }
});
const showLocalNotification = (title, body, swRegistration) => {
    const options = {body};
    swRegistration.showNotification(title, options);
}
