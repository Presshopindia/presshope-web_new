import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";
export const requestForToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        return getToken(messaging, { vapidKey: "BNFALdFhcWIXJjwETVmxzs2X5KnUGM4NZ7PdK0pQLnOklFyiQJMaYOZesPKmODpUoW6l_oUqj3Vzcwh7fMMoUKE" })
            .then((currentToken) => {
                if (currentToken) {
                    localStorage.setItem("DeviceToken", currentToken)
                } else {
                }
            })
            .catch((err) => {
            });
    }
    else if (permission === 'denied') {
    }

};