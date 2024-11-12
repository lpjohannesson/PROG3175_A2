# Greetings API

## Endpoints

* ```/Greet```
    * timeOfDay
    * language
    * tone
* ```/GetAllTimesOfDay```
* ```/GetSupportedLanguages```

## Example

Request: ```http://localhost/Greet?timeOfDay=Morning&language=English&tone=Formal```

Response: ```{"greetingMessage":"Good morning"}```

## Run
Server:

```
npm install
npm run start
```

Client:

```
dotnet run
```

## GitHub link
https://github.com/lpjoh/PROG3175_A2