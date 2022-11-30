import {predict} from "backend/toxicity"

export function wixChat_onMessage(event) {
  predict(event.payload.text,event.channelId)
}
