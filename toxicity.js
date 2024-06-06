//This code is for use in a web.js file in Wix Studio or Classic Wix editor
//you will also need the events.js file

import * as toxicity from '@tensorflow-models/toxicity';
import { Permissions, webMethod } from "wix-web-module";
import wixChatBackend from 'wix-chat-backend';
require('@tensorflow/tfjs');

let model;
let modelPromise;
const loadModel = () => {
    const includedLabels = ["toxicity"];
    modelPromise = toxicity.load(0.9, includedLabels)
};

loadModel();

export const predict = webMethod(
    Permissions.Anyone, async (inputs, channelId) => {
        console.time("Prediction time")
        try {
            model = await modelPromise
            const results = await model.classify(inputs);
            const toxicityResult = results[0].results[0].match

            if (toxicityResult) {
                return sendWarning(channelId)
            } else {
                return sendOk(channelId)
            }
        } catch (error) {
            console.error("Error during prediction:", error);
        } 

    });

const sendWarning = (channelId) => {
    wixChatBackend.sendMessage({
            "messageText": "We don't do that here. Be nice and try again.",
            "channelId": channelId,

        })
        .then(() => {
            console.log("Chat warning message sent");
            console.timeEnd("Prediction Time");
        })
        .catch((error) => {
            console.error(error);
        });
}

const sendOk = (channelId) => {
    wixChatBackend.sendMessage({
            "messageText": "Thank you for contacting us, someone will be with you soon",
            "channelId": channelId,

        })
        .then(() => {
            console.log("Chat ok message sent");
            console.timeEnd("Prediction Time");
        })
        .catch((error) => {
            console.error(error);
        });
}
