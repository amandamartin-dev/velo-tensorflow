import {predict} from "backend/toxicity"
//for wix studio the import should look like this import {predict} from "backend/toxicity.web.js"

export function wixChat_onMessage(event) {
    if (event.direction === "VisitorToBusiness") {
        predict(event.payload.text, event.channelId)
    }
}
