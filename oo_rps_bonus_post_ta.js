const readline = require('readline-sync');

const createHuman = () => {
  let playerObject = createPlayer('human');

  let humanObject = {

    shortcutChoices: {
      1: 'rock',
      2: 'paper',
      3: 'scissors',
      4: 'spock',
      5: 'lizard',
    },

    choose() {
      let choice;

      while (true) {
        console.log('Please choose \x1b[96m1\x1b[0m-rock, \x1b[96m2\x1b[0m-paper, \x1b[96m3\x1b[0m-scissors, \x1b[96m4\x1b[0m-spock, \x1b[96m5\x1b[0m-lizard or \x1b[96mh\x1b[0mistory of moves:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors', 'lizard', 'spock', '1', '2', '3', '4', '5'].includes(choice.toLowerCase())) break;
        else if (choice === 'h' || choice === 'history') RPSGame.displayHistory();
        else console.log('Sorry, invalid choice');
      }
      if (this.shortcutChoices[choice]) {
        this.move = this.shortcutChoices[choice];
      } else this.move = choice;
      this.logMove(this);
      RPSGame.computer.rebaseProbabilities(this.move);
    },
  };
  return Object.assign(playerObject, humanObject);
};

const createComputer = () => {
  let playerObject = createPlayer('computer');

  let computerObject = {
    probBase: {
      rock: 20,
      paper: 20,
      scissors: 20,
      spock: 20,
      lizard: 20,
    },

    probTiers: {
      rock: 20,
      paper: 20,
      scissors: 20,
      spock: 20,
      lizard: 20,
    },

    PROB_ADD: 10,

    choose() {
      let choice = Math.random();
      this.move = this.smarterChoice(choice);
      this.logMove(this);
    },

    rebaseProbabilities(choice) {
      this.increaseWeights(choice);
      let sum = Object.values(this.probBase).reduce((a, b) => a + b);
      let prevSum = 0;
      for (let move in this.probTiers) {
        this.probTiers[move] = (this.probBase[move] / sum) + prevSum;
        prevSum = this.probTiers[move];
      }
    },

    increaseWeights(choice) {
      let loseFromOther = {
        rock: ['paper', 'spock'],
        paper: ['lizard', 'scissors'],
        scissors: ['rock', 'spock'],
        spock: ['lizard', 'paper'],
        lizard: ['rock', 'scissors']
      };
      loseFromOther[choice].forEach(element => {
        this.probBase[element] += this.PROB_ADD;
      });
    },

    smarterChoice(choiceNumber) {
      let finalChoice;
      let prevMoveValue = 0;
      let move;
      for (move in this.probTiers) {
        if (choiceNumber > prevMoveValue
          && choiceNumber <= this.probTiers[move]) {
          finalChoice = move;
        }
        prevMoveValue = this.probTiers[move];
      }
      return finalChoice;
    },
  };
  return Object.assign(playerObject, computerObject);
};

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  SCORE_TO_WIN: 5,
  counter: 0,
  moves: {human: [], computer: []},

  displayWelcomeMessage() {
    console.log('\x1b[35mWelcome to RPSSL!\x1b[0m');
  },

  displayGoodbyeMessage() {
    if (this.human.score === 5) {
      console.log('\x1b[93mCongratulations! You are the final winner!\x1b[0m');
    } else console.log('\x1b[91mThe final winner is the computer.\x1b[0m');
    console.log('Thanks for playing RPSSL. Goodbye!');
  },

  displayWinner() {
    let beatsOther = {
      rock: ['lizard', 'scissors'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      spock: ['scissors', 'rock'],
      lizard: ['spock', 'paper']
    };
    console.log(`\x1b[93mYou chose: ${this.human.move}\x1b[0m`);
    console.log(`\x1b[91mThe computer chose: ${this.computer.move}\x1b[0m`);
    if (this.human.move === this.computer.move) console.log("It's a tie.");
    else if (beatsOther[this.human.move].includes(this.computer.move)) {
      console.log('\x1b[93mYou win!\x1b[0m');
      this.human.score++;
    } else {
      console.log('\x1b[91mComputer wins\x1b[0m!');
      this.computer.score++;
    }
  },

  displayScore() {
    console.log(`The runnning score is human: ${this.human.score}, computer: ${this.computer.score}`);
    console.log(`\x1b[90mFirst to ${RPSGame.SCORE_TO_WIN} wins.\x1b[0m`);
  },

  displayHistory() {
    console.log('\x1b[92m');
    console.log('### MOVES HISTORY ###');
    for (let counter = 1; counter <= RPSGame.moves.human.length; counter++) {
      console.log(`Turn ${counter}: computer - ${RPSGame.moves.computer[counter - 1]}, human - ${RPSGame.moves.human[counter - 1]}`);
    }
    console.log('\x1b[0m');
  },

  resetGame() {
    this.human.score = 0;
    this.computer.score = 0;
    this.moves = {human: [], computer: []};
  },

  play() {
    console.clear();
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      console.clear();
      this.computer.choose();
      this.displayWinner();
      this.displayScore();
      if (this.human.score < RPSGame.SCORE_TO_WIN
        && this.computer.score < RPSGame.SCORE_TO_WIN) {
        continue;
      }
      this.displayGoodbyeMessage();
      this.resetGame();
      if (!this.playAgain()) break;
    }
  },

  playAgain() {
    console.log('Would you like to play again? (\x1b[96my\x1b[0m/\x1b[96mn\x1b[0m)');
    let answer = readline.question();
    return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
  },

};

// the object factory
function createPlayer(name) {
  return {
    name,
    move: null,
    score: 0,

    logMove(obj) {
      RPSGame.counter++;
      RPSGame.moves[obj.name].push(obj.move);
    },

  };
}

RPSGame.play();