import React, { Component } from 'react';
import './stylesheet/index.css';

import GuessButton from './components/GuessButton';
import GuessList from './components/GuessList';
import GuessTurns from './components/GuessTurns';
import GuessHeader from './components/GuessHeader';
import GuessMessage from './components/GuessMessage';
import GuessWords from './components/GuessWords';

import {countSimilarLetters} from './javascripts/countSimilarLetters';
import {validateInput} from './javascripts/validateInput';
import {pickWord} from './javascripts/pickWord';
import {compareIfWon} from './javascripts/compareIfWon';
import {wordList} from './javascripts/wordList';
import {checkLength} from './javascripts/checkLength';

import config from './guess-config';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guessWord: '',
      baseWord: pickWord(wordList),
      history: [],
      won: false,
      isDisabled: false,
      currentTurns: 0,
      buttonText: config.buttonText.guess,
      message: ''
    };
    console.log(this.state.baseWord);

    this.updateWord = this.updateWord.bind(this);
    this.onClick = this.onClick.bind(this);
    this.start = this.start.bind(this);
  }

  addToList(guessWord) {
    let similarLetters = countSimilarLetters(guessWord, this.state.baseWord);
    this.setState({
      history: [
        ...this.state.history,
        {
          guessWord,
          similarLetters
        }
      ]
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

  start() {
    this.updateWord(this.state.guessWord);
    if (compareIfWon(this.state.baseWord, this.state.guessWord)) {
      this.setState({
        won: true,
        isDisabled: true,
        buttonText: config.buttonText.reset,
        message: config.message.wonMessage
      });
    } else {
      this.getCurrentTurns();
      this.addToList(this.state.guessWord);
      this.setState({
        message: config.message.wrongMessage,
        guessWord: '',
        isDisabled: false
      });
    }
  }

  resetGame() {
    const baseWord = pickWord(wordList);
    console.log(baseWord);
    this.setState({
      guessWord: '',
      baseWord: baseWord,
      history: [],
      won: false,
      isDisabled: false,
      count: 0,
      currentTurns: 0,
      buttonText: config.buttonText.guess,
      message: ''
    });
  }

  onClick() {
    if (this.state.won) {
      this.resetGame();
    } else {
      this.start();
    }
  }

  render() {
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
            onCount={this.start}
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
