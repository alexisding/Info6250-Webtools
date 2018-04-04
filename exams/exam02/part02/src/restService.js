import config from './config';

const alfredPort = config.port.alfred;
const barbaraPort = config.port.barbara;

const postFetchSecretWord = (port) => {
  return fetch(`${port}/game`, {
    method: 'POST',
    mode: 'cors'
  });
};

const deleteFetchSecretWord = (port, id) => {
  return fetch(`${port}/game/${id}`, {
    method: 'DELETE',
    mode: 'cors'
  });
};

const putFetchGuessWord = (port, id, matched) => {
  return fetch(`${port}/game/${id}/guessed`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({matched})
  });
};

const getFetchGuessWord = (port, id, guessWord) => {
  return fetch(`${port}/game/${id}/guess/${guessWord}`, {
    mode: 'cors'
  });
};

export async function getSecretWord() {
  try {
    const alfredRes = await postFetchSecretWord(alfredPort);
    const barbaraRes = await postFetchSecretWord(barbaraPort);
    const alfred = await alfredRes.json();
    const barbara = await barbaraRes.json();
    return {alfred, barbara};
  } catch(e) {
    console.log(e);
  }
}

export async function deleteSecretWord(alfredId, barbaraId) {
  try {
    await deleteFetchSecretWord(alfredPort, alfredId);
    await deleteFetchSecretWord(barbaraPort, barbaraId);
  } catch(e) {
    console.log(e);
  }
}

export async function putGuessWord(alfredId, barbaraId, alfredMatched, barbaraMatched) {
  const alfredRes = await putFetchGuessWord(alfredPort, alfredId, alfredMatched);
  const barbaraRes = await putFetchGuessWord(barbaraPort, barbaraId, barbaraMatched);
  const alfred = await alfredRes.json();
  const barbara = await barbaraRes.json();
  return {alfred, barbara};
}

export async function getGuessWord(alfredId, barbaraId, alfredGuess, barbaraGuess) {
  const alfredRes = await getFetchGuessWord(barbaraPort, barbaraId, alfredGuess);
  const barbaraRes = await getFetchGuessWord(alfredPort, alfredId, barbaraGuess);
  const alfred = await alfredRes.json();
  const barbara = await barbaraRes.json();
  return {alfred, barbara};
}
