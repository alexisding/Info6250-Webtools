export const guessStatus = (guessWord, secretId) => {
  return fetch('/checkGuess', {
    method: 'POST',
    body: JSON.stringify({guessWord, secretId})
  })
  .then(response => (response.ok ? response.json() : Promise.reject(response.status())))
  .catch((status) => {
    switch(status) {
      case 401: return Promise.reject('post-length-fail');
      default: return Promise.reject('post-fail');
    }
  });
};

export const getList = () => {
  return fetch('/wordList')
    .then(response => (response.ok ? response.json() : Promise.reject(response.text())))
    .catch(() => Promise.reject('get-fail'));
};

export const getSecret = () => {
  return fetch('/updateSecretId')
    .then(response => (response.ok ? response.json() : Promise.reject(response.status())))
    .catch(() => Promise.reject('get-secret-fail'));
};