import React, { Component } from 'react';
import './stylesheet/index.css';

import Button from './components/Button';
import GuessList from './components/GuessList';
import GuessTurns from './components/GuessTurns';
import GuessHeader from './components/GuessHeader';
import GuessMessage from './components/GuessMessage';
import Player from './components/Player';

import {getSecretWord, deleteSecretWord, putGuessWord, getGuessWord} from './restService';

import config from './config';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alfredSecret: '',
      alfredGuess: '',
      alfredId: '',
      alfredMatched: 0,
      alfredHistory: [],
      alfredWon: false,
      barbaraSecret: '',
      barbaraGuess: '',
      barbaraId: '',
      barbaraMatched: 0,
      barbaraHistory: [],
      barbaraWon: false,
      isDisabled: false,
      currentTurns: 0,
      buttonText: config.buttonText.start,
      message: '',
    };

    this.start = this.start.bind(this);
  }

  async start() {
    if(!this.state.alfredWon && !this.state.barbaraWon) {
      try {
        const secret = await getSecretWord();
        await this.setState({
          alfredSecret: secret.alfred.secret,
          alfredId: secret.alfred.id,
          barbaraSecret: secret.barbara.secret,
          barbaraId: secret.barbara.id,
          isDisabled: true
        });
        while (!this.state.alfredWon && !this.state.barbaraWon) {
          await this.handlePut(
            this.state.alfredId,
            this.state.barbaraId,
            this.state.alfredMatched,
            this.state.barbaraMatched
          );
          await this.handleGet(
            this.state.alfredId,
            this.state.barbaraId,
            this.state.alfredGuess,
            this.state.barbaraGuess
          );
          await this.addToHistory();
        }
        this.handleResult();
        this.handleDelete(this.state.alfredId, this.state.barbaraId);
      } catch(e) {
        console.log(e);
      }
    } else {
      this.resetGame();
    }
  }

  async addToHistory() {
    await this.setState({
      alfredHistory: [
        ...this.state.alfredHistory,
        {
          guessWord: this.state.alfredGuess,
          matched: this.state.alfredMatched
        }],
      barbaraHistory: [
        ...this.state.barbaraHistory,
        {
          guessWord: this.state.barbaraGuess,
          matched: this.state.barbaraMatched
        }],
      });
  }

  async handleGet(alfredId, barbaraId, alfredGuess, barbaraGuess) {
    try {
      const guess = await getGuessWord(alfredId, barbaraId, alfredGuess, barbaraGuess);
      await this.setState({
        alfredMatched: guess.alfred.matched,
        alfredWon: guess.alfred.hasWon,
        barbaraMatched: guess.barbara.matched,
        barbaraWon: guess.barbara.hasWon
      });
    } catch(e) {
      console.log(e);
    }
  }

  async handlePut(alfredId, barbaraId, alfredMatched, barbaraMatched) {
    try {
      const guess = await putGuessWord(alfredId, barbaraId, alfredMatched, barbaraMatched);
      await this.setState(prevState => {
        return {
          currentTurns: prevState.currentTurns + 1,
          alfredGuess: guess.alfred.guess,
          barbaraGuess: guess.barbara.guess
        };
      });
    } catch(e) {
      console.log(e);
    }
  }

  async handleDelete(alfredId, barbaraId) {
    try {
      await deleteSecretWord(alfredId, barbaraId);
    } catch(e) {
      console.log(e);
    }
  }

  handleResult() {
    if(this.state.alfredWon && this.state.barbaraWon) {
      this.setState({
        isDisabled: false,
        buttonText: config.buttonText.reset,
        message: config.message.tie
      });
    }

    if(this.state.alfredWon || this.state.barbaraWon) {
      this.setState({
        isDisabled: false,
        buttonText: config.buttonText.reset
      });
      if(this.state.alfredWon) {
        this.setState({
          message: config.message.alfredWon
        });
      }
      if(this.state.barbaraWon) {
        this.setState({
          message: config.message.barbaraWon
        });
      }
    }
  }

  async resetGame() {
    await this.setState({
      alfredSecret: '',
      alfredGuess: '',
      alfredId: '',
      alfredMatched: 0,
      alfredHistory: [],
      alfredWon: false,
      barbaraSecret: '',
      barbaraGuess: '',
      barbaraId: '',
      barbaraMatched: 0,
      barbaraHistory: [],
      barbaraWon: false,
      isDisabled: false,
      currentTurns: 0,
      buttonText: config.buttonText.start,
      message: '',
    });
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
          <Button
            text={this.state.buttonText}
            onClick={this.start}
            disabled={this.state.isDisabled}
          />
        </div>
        <div className="columns">
          <span className="alfred"><Player player="Alfred" secret={this.state.alfredSecret}/></span>
          <GuessList history={this.state.alfredHistory} />
          <span className="barbara"><Player player="Barbara" secret={this.state.barbaraSecret}/></span>
          <GuessList history={this.state.barbaraHistory} />
        </div>
      </div>
    );
  }
}

export default App;
