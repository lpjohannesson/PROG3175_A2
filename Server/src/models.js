class GreetingRequest {
    constructor(timeOfDay, language, tone) {
        this.timeOfDay = timeOfDay;
        this.language = language;
        this.tone = tone;
    }
};

class GreetingResponse {
    constructor(greetingMessage) {
        this.greetingMessage = greetingMessage;
    }
}

module.exports = { GreetingRequest, GreetingResponse }