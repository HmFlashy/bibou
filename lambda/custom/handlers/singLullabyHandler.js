const Alexa = require("alexa-sdk");
const config = require("../config");
const msgH = require("../messages/msgHelper");

const GENERAL_MSG = require("../messages/generalMessages.json");
const MSG = require('../messages/singLullabyMessages.json');

const LULLABY_URL = "https://s3.amazonaws.com/bibou/invocation.mp3"

// ================================

const singLullabyHandler = Alexa.CreateStateHandler(config.STATES.SING_LULLABY_STATE, {
  StartSinging() {
    const speechOutput = "<audio src='" + LULLABY_URL + "'/>"
    this.response.speak(speechOutput)
    this.emit(':responseReady');
  },
  Unhandled() {
    let speechOutput = msgH.pickOne(GENERAL_MSG.errors);
    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(":responseReady");
  }
});

module.exports = singLullabyHandler;
