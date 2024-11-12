const express = require('express');
const database = require('./database.js');
const { GreetingRequest, GreetingResponse } = require('./models.js');

const app = express();
const port = 80;

const db = database.createDatabase();

let timesOfDay, languages, tones;

(async () => {
    await database.getColumnList(db, 'timeOfDay').then((list) => {
        timesOfDay = list;
    });
    
    await database.getColumnList(db, 'language').then((list) => {
        languages = list;
    });

    app.get('/Greet', (req, res) => {
        const greetingRequest = new GreetingRequest(
            req.query.timeOfDay,
            req.query.language,
            req.query.tone
        );

        database.getGreeting(db, greetingRequest).then((greeting) => {
            if (greeting == null) {
                res.sendStatus(404);
                return;
            }

            res.json(new GreetingResponse(greeting.greetingMessage));
        });
    });
    
    app.get('/GetAllTimesOfDay', (req, res) => {
        res.json(timesOfDay);
    });
    
    app.get('/GetSupportedLanguages', (req, res) => {
        res.json(languages);
    });

    app.listen(port, () => {
        console.log(`Running on port ${port}`)
    });    
})();