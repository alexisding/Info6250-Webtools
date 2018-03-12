import React, { Component } from 'react';
import './stylesheet/index.css';

import GuessButton from './components/GuessButton';
import GuessList from './components/GuessList';
import GuessTurns from './components/GuessTurns';
import GuessHeader from './components/GuessHeader';
import GuessMessage from './components/GuessMessage';
import GuessWords from './components/GuessWords';

import {validateInput} from './javascripts/validateInput';
import {checkLength} from './javascripts/checkLength';
import {pickErrorMessage} from './javascripts/statusMessage';
import {guessStatus, getList, getSecret} from './javascripts/restService';

import config from './guess-config';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      guessWord: '',
      secretId: '',
      history: [],
      won: false,
      isDisabled: false,
      currentTurns: 0,
      buttonText: config.buttonText.guess,
      message: '',
      error:''
    };

    this.updateWord = this.updateWord.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleGuess = this.handleGuess.bind(this);
  }

  componentWillMount() {
    this.fetchList();
    this.fetchSecret();
  }

  fetchList() {
    getList()
    .then( list => this.handleList(list) )
    .catch( e => this.handleError(e) );
  }

  fetchSecret() {
    getSecret()
    .then( secretId => this.handleSecret(secretId) )
    .catch( e => this.handleError(e) );
  }

  fetchGuessWord() {
    guessStatus(this.state.guessWord, this.state.secretId)
      .then(response => this.handleGuess(response))
      .catch(e => this.handleError(e));
  }

  handleList(wordList = []) {
    this.setState({wordList});
  }

  handleSecret(secretId = '') {
    this.setState({secretId});
  }

  handleError(e) {
    this.setState({
      error: e
    });
  }

  getCurrentTurns() {
    this.setState(prevState => {
      return {
        currentTurns: prevState.currentTurns + 1
      };
    });
  }

  updateWord(guessWord) {
    const input = validateInput(guessWord);
    if (checkLength(input)) {
      this.setState({
        isDisabled: true
      })
    } else {
      this.setState({
        isDisabled: false
      });
    }
    this.setState({
      guessWord: input,
    });
  }

  handleGuess(response) {
    this.updateWord(this.state.guessWord);
    if(response) {
      if (response.sawWon) {
        this.setState({
          won: true,
          isDisabled: true,
          buttonText: config.buttonText.reset,
          message: config.message.wonMessage
        });
      } else {
        this.getCurrentTurns();
        this.setState({
          history: [
            ...this.state.history,
            {
              guessWord: this.state.guessWord,
              similarLetters: response.sawCount
            }],
          message: config.message.wrongMessage,
          guessWord: '',
          isDisabled: false
        });
      }
    }
  }

  resetGame() {
    this.setState({
      wordList: [],
      guessWord: '',
      secretId: '',
      history: [],
      won: false,
      isDisabled: false,
      similarLetters: 0,
      currentTurns: 0,
      buttonText: config.buttonText.guess,
      message: '',
      error: ''
    });
    this.fetchList();
    this.fetchSecret();
  }

  onClick() {
    if (this.state.won) {
      this.resetGame();
    } else {
      this.fetchGuessWord();
    }
  }

  clearError() {
    const code = this.state.error;
    this.setState({
      error: ''
    });
    switch (code) {
      case 'get-secret-fail':
        this.fetchSecret();
        break;
      case 'get-fail':
        this.fetchList();
        break;
      default:
    }
  }

  render() {
    const code = this.state.error;
    let message = pickErrorMessage(code);
    if (message) {
      message = (
        <div className="error-message">
          <p >{message}</p>
          <button onClick={() => this.clearError()}>OK</button>
        </div>
      );
      if (code === 'get-secret-fail' || code === 'get-fail') {
        return <div className="error-message">{message}</div>;
      }
    }

    return (
      <div>
        <header>
          <GuessHeader title="Guess the Word" />
        </header>
        <div className="status-message">
          <GuessTurns turns={this.state.currentTurns} />
          <GuessMessage message={this.state.message} />
        </div>
        <div className="form">
          <GuessWords
            guessWord={this.state.guessWord}
            onCount={this.onClick}
            onUpdateWord={this.updateWord}
            isValid={this.state.isDisabled}
          />
          <GuessButton
            text={this.state.buttonText}
            onClick={this.onClick}
            disabled={this.state.isDisabled}
          />
        </div>
        <div>
          <GuessList history={this.state.history} />
        </div>
      </div>
    );
  }
}

export default App;
