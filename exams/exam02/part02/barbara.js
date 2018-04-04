const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./src/config').port.barbara;
const port = config.substring(config.lastIndexOf(':') + 1);
const PORT = port || process.env.PORT;

const wordListCode = require('./wordListCode');
let secretWords = {};
let timestampList = {};
let currentGuess = '';

app.use(express.static('public'));
app.use(bodyParser.json({extended: true, type: '*/*'}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (request, response) => {
  response.send('Welcome to Guess Word Game!');
});

app.post('/game', (request, response) => {
  wordListCode.randomPickId();
  const secretId = wordListCode.pickedId();
  const secretWord = wordListCode.pickWord();
  secretWords[secretId] = secretWord;
  const date = new Date();
  const timestamp = date.getTime();
  timestampList[secretId] = timestamp;
  console.log("Barbara " + secretId + " start time: " + timestampList[secretId]);
  response.send(JSON.stringify({
    id: secretId,
    secret: secretWord
  }));
});

app.get('/game/:id/guess/:guessWord', (request, response) => {
  const id = request.params.id;
  const guessWord = request.params.guessWord;
  const matched = wordListCode.countSimilarLetters(guessWord, secretWords[id]);
  response.send(JSON.stringify({
    matched: matched,
    hasWon: (guessWord.toUpperCase()) === (secretWords[id].toUpperCase())
  }));
});

app.put('/game/:id/guessed', (request, response) => {
  const id = request.params.id;
  const matched = request.body.matched;
  const guessWord = wordListCode.pickGuessWord(currentGuess, matched);
  currentGuess = guessWord;
  response.send(JSON.stringify({
    guess: guessWord
  }));
});

app.delete('/game/:id', (request, response) => {
  const id = request.params.id;
  const matched = request.body.matched;
  delete matched;
  delete secretWords[id];
  currentGuess = '';
  wordListCode.all();
  response.end();
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('use Ctrl-C to stop this server');
});
