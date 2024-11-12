const sqlite3 = require('sqlite3').verbose();

async function getColumnList(db, column) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT DISTINCT ${column} FROM greetings`,
            (err, rows) => {
                if (err) {
                    resolve([]);
                    return;
                }
    
                const list = [];
    
                for (const row of rows) {
                    list.push(row[column]);
                };
    
                resolve(list);
            }
        );
    });
};

async function getGreeting(db, greetingRequest) {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM greetings g WHERE
            g.timeOfDay = ? AND
            g.language = ? AND
            g.tone = ?`,
            greetingRequest.timeOfDay,
            greetingRequest.language,
            greetingRequest.tone,
            (err, rows) => {
                if (err || rows.length == 0) {
                    resolve(null);
                    return;
                }
    
                resolve(rows[0]);
            }
        );
    });
};

function seedDatabase(db) {
    const timesOfDay = ["Morning", "Afternoon", "Evening"];
    const greetingSets = [
        {
            language: "English",
            formal: ["Good morning", "Good afternoon", "Good evening"],
            casual: ["'Morning", "'Afternoon", "'Evening"]
        },
        {
            language: "French",
            formal: ["Bonjour", "Bon après-midi", "Bonsoir"],
            casual: ["Salut", "Salut", "Salut"]
        },
        {
            language: "Spanish",
            formal: ["Buenos días", "Buenas tardes", "Buenas noches"],
            casual: ["Hola", "Hola", "Hola"]
        }
    ];

    const greetings = [];

    for (const greetingSet of greetingSets) {
        const language = greetingSet.language;
        
        const createGreetings = (messages, tone) => {
            messages.forEach((message, i) => {
                greetings.push({
                    timeOfDay: timesOfDay[i],
                    language: language,
                    greetingMessage: message,
                    tone: tone
                });
            });
        }

        createGreetings(greetingSet.formal, "Formal");
        createGreetings(greetingSet.casual, "Casual");
    };

    const insert = db.prepare(`
        INSERT INTO greetings 
        (id, timeOfDay, language, greetingMessage, tone)
        VALUES (?,?,?,?,?)`
    );

    greetings.forEach((greeting, i) => {
        insert.run(
            i + 1,
            greeting.timeOfDay,
            greeting.language,
            greeting.greetingMessage,
            greeting.tone
        );
    });

    insert.finalize();
}

function createDatabase() {
    const db = new sqlite3.Database('./app.db');
    db.serialize();
    
    db.run(`DROP TABLE IF EXISTS greetings`);
    db.run(`
        CREATE TABLE greetings (
        id INT PRIMARY KEY,
        timeOfDay TEXT,
        language TEXT,
        greetingMessage TEXT,
        tone TEXT)`
    );

    seedDatabase(db);
    return db;
};

module.exports = { createDatabase, getColumnList, getGreeting }