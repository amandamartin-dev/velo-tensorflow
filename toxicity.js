import * as toxicity from '@tensorflow-models/toxicity';
import wixChatBackend from 'wix-chat-backend';

let model;

export async function predict(input, channelId) {
    model = await toxicity.load();
    const predictions = await classify(input, channelId);
    return predictions

}

const classify = async (inputs, channelId) => {
    const results = await model.classify(inputs);
    const toxicity = results[6].results[0].match
    if (toxicity === true) {
        sendWarning(channelId)
    }

};

function sendWarning(channelId) {
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
