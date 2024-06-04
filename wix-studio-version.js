//This code is for use in a web.js file in Wix Studio
//you will also need the events.js file

import * as toxicity from '@tensorflow-models/toxicity';
import { Permissions, webMethod } from "wix-web-module";
import wixChatBackend from 'wix-chat-backend';
require('@tensorflow/tfjs');

let model;

export const predict = webMethod(
  Permissions.Anyone, 
  async (message, channelId) => { 
    try {
       const predictions = await classify(message, channelId);
    return predictions
    } catch (error) {
      console.error("Error"+ error)
    }
  
  }
);

const classify = async (inputs, channelId) => {
    model = await toxicity.load()
    const results = await model.classify(inputs);
    console.log(results)
    const toxicityResult = results[6].results[0].match
    if (toxicityResult === true) {
        sendWarning(channelId)
    }else{
      sendOk(channelId)
    }

};

const sendWarning = (channelId) => {
    wixChatBackend.sendMessage({
            "messageText": "We don't do that here. Be nice and try again.",
            "channelId": channelId,

        })
        .then(() => {
            console.log("Chat message sent");
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
            console.log("Chat message sent");
        })
        .catch((error) => {
            console.error(error);
        });
}
