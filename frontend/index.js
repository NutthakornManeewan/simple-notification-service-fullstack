const checkServices = () => {
    if(!("serviceWorker" in navigator)) throw new Error("No service-worker support!");
    if(!("PushManager" in window)) throw new Error("No Push-API support!")
}

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register("service.js");
    return swRegistration;
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if(permission !== "granted") {
        throw new Error("Permission not granted for Notification!");
    }
}

const showLocalNotification = (title, body, swRegistration) => {
    const notificationOptions = { body };
    swRegistration.showNotification(title, notificationOptions);
}

const main = async () => {
    checkServices();
    try {
        const swRegistration = await registerServiceWorker();
        const permission = await requestNotificationPermission();     
    } catch (error) {
        console.error(error);
    }

}

// main();
