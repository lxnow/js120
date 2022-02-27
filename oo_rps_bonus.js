const readline = require('readline-sync');
const SCORE_TO_WIN = 5;
const shortcutChoices = {
  1: 'rock',
  2: 'paper',
  3: 'scissors',
  4: 'spock',
  5: 'lizard',
};
let moves = {};
let counter = 0;

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

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
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`\x1b[93mYou chose: ${this.human.move}\x1b[0m`);
    console.log(`\x1b[91mThe computer chose: ${this.computer.move}\x1b[0m`);

    if (humanMove === computerMove) {
      console.log("It's a tie.");
    } else if ((humanMove === 'rock' && (computerMove === 'lizard' || computerMove === 'scissors'))
      || (humanMove === 'paper' && (computerMove === 'rock' || computerMove === 'spock'))
      || (humanMove === 'scissors' && (computerMove === 'paper' || computerMove === 'spock'))
      || (humanMove === 'spock' && (computerMove === 'scissors' || computerMove === 'rock'))
      || (humanMove === 'lizard' && (computerMove === 'spock' || computerMove === 'paper'))) {
      console.log('\x1b[93mYou win!\x1b[0m');
      this.human.score++;
    } else {
      console.log('\x1b[91mComputer wins\x1b[0m!');
      this.computer.score++;
    }
  },

  displayScore() {
    console.log(`The runnning score is human: ${this.human.score}, computer: ${this.computer.score}`);
    console.log(`\x1b[90mFirst to ${SCORE_TO_WIN} wins.\x1b[0m`);
  },

  resetGame() {
    this.human.score = 0;
    this.computer.score = 0;
  },

  play() {
    console.clear();
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      this.displayScore();
      if (this.human.score < SCORE_TO_WIN
        && this.computer.score < SCORE_TO_WIN) {
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
    return answer.toLowerCase()[0] === 'y';
  },

};

function createComputer() {
  let playerObject = createPlayer('computer');

  let computerObject = {
    choose() {
      const choices = ['rock', 'scissors', 'paper', 'spock', 'lizard'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
      counter++;
      moves[counter] = this.name + ' - ' + this.move;
    }
  };
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer('human');

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose \x1b[96m1\x1b[0m-rock, \x1b[96m2\x1b[0m-paper, \x1b[96m3\x1b[0m-scissors, \x1b[96m4\x1b[0m-spock, \x1b[96m5\x1b[0m-lizard or \x1b[96mh\x1b[0mistory of moves:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors', 'lizard', 'spock', '1', '2', '3', '4', '5'].includes(choice.toLowerCase())) break;
        else if (choice === 'h' || choice === 'history') displayHistory();
        else console.log('Sorry, invalid choice');
      }
      if (shortcutChoices[choice]) this.move = shortcutChoices[choice];
      else this.move = choice;
      counter++;
      moves[counter] = this.name + ' - ' + this.move;
    },
  };
  return Object.assign(playerObject, humanObject);
}

function createPlayer(name) {
  return {
    name,
    move: null,
    score: 0,
  };
}

function displayHistory() {
  console.log('\x1b[92m');
  console.log('### MOVES HISTORY ###');
  for (let move in moves) {
    console.log(`Turn ${move}: ${moves[move]}`);
  }
  console.log('\x1b[0m');
}

RPSGame.play();