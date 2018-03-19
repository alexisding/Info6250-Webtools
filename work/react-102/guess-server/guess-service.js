const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000 || process.env.PORT;

const wordListCode = require('./wordListCode');

app.use(express.static('public'));
app.use(bodyParser.json({extended: true, type: '*/*'}));

app.get('/', (request, response) => {
  response.send('Welcome to Guess Word Game!');
});

app.get('/wordList', (request, response) => {
  response.send(JSON.stringify(wordListCode.all()));
});

// update secret ID
app.get('/updateSecretId', (request, response) => {
  wordListCode.randomPickId();
  const secretId = wordListCode.pickedId();
  const secretWord = wordListCode.pickWord();
  console.log('[Update] secret ID is: ' + secretId);
  /* uncomment to get secret word */
  // console.log('secret word is: ' + secretWord);
  response.send(JSON.stringify(secretId));
});

// get secret ID
app.get('/secretId', (request, response) => {
  const secretId = wordListCode.pickedId();
  response.send(JSON.stringify(secretId));
});

app.post('/checkGuess', (request, response) => {
  const guessWord = request.body.guessWord;
  if(!wordListCode.checkLength(guessWord)) {
    response.status(401).end();
  } else {
    const guessId = wordListCode.findIdByWord(guessWord);
    //const secretId = request.body.secretId;
    const secretId = wordListCode.pickedId();
    const won = (secretId === guessId);
    const count = wordListCode.countSimilarLetters(guessWord);
    response.send(JSON.stringify({
      sawWon: won,
      sawCount: count
    }));
    console.log('number of similar letters: ' + count);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('use Ctrl-C to stop this server');
});
