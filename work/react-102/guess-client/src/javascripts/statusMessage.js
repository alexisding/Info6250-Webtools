const messages = {
  'get-fail': 'Failed to load wordlist.  Check your network connection and try again.',
  'get-secret-fail': 'Failed to get secret word.  Check your network connection and try again.',
  'post-fail': 'Failed to guess. Check your network connection and try again.',
  'post-length-fail': 'Failed to guess. Please input only five letters.',
  'generic-error': 'Uh-oh, something bad happened'
};

export const pickErrorMessage = code => {
  if(!code) {
    return '';
  }
  code = messages[code] ? code : 'generic-error';
  return messages[code];
};