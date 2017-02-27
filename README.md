# PandaCounter
🐼 A simple web app to count how many people mistyped iOS and related terms

## Usage
**GET** `/` to view the animals list

**GET** `/:animal` to view current count

**POST** `/:animal` to report a dead animal

## Response format

### List
```javascript
{"animals":[":panda_face:",":koala:",":unicorn_face:",":dolphin:",":dove_of_peace:"]}
```

### Specific animal
```javascript
{":panda_face:":"3"}
```

## Requirements
- Heroku
- Heroku Redis

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
