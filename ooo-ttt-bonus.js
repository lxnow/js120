let readline = require('readline-sync');

// Bonus question 1. Added a custom function to the built-in Array object. 
// I read that this is not necessarily best practice, though using 
// `Object.defineProperty`` helps mitigate the mutability and enumerability 
// issues related to this. Would like to get additional feedback on that.
Object.defineProperty(Array.prototype, 'joinOr', 
  {value: function(delimiter = ', ', finalDelimiter = 'or') {
  if (this.length === 1) return this.toString();
  else if (this.length === 2) return this[0] + ' ' + finalDelimiter + ' ' + this[1];
  else {
    let stringResult = '';
    for (let counter = 0; counter < this.length - 1; counter++ ){
      stringResult = stringResult + this[counter] + delimiter;
    } 
    stringResult = stringResult +  finalDelimiter + ' ' + this[this.length - 1];
    return stringResult;
  }
}});

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }
  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

}

class Board {
  constructor() {
    this.squares = {};
    // for (let counter = 1; counter <= 9; counter++) {
    //   this.squares[String(counter)] = new Square();
    // }
    this.init();
  }

  init() {
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class Score {
  constructor(player) { // what's the purpose of including a player property though?
    this.player = player;
    this.score = 0;
  }

  addPoint() {
    this.score += 1;
  }

}

class TTTGame {
  static MATCHES_TO_WIN = 3;
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.humanScore = new Score(this.human);
    this.computerScore = new Score(this.computer);
  }
  // Bonus question 2 below until method `playAgain()`. Two new methods, one for
  // the first game, which shows a welcome message, and a `nextPlay` method for
  // any subsequent games. Both methods call the modified `play` method which
  // goes through the same logic as before, except it adds a `playAgain` 
  // question in the end. If user selects 'y', we init() the board
  firstPlay() {
    this.displayWelcomeMessage();
    this.board.display();
    this.play();
  }

  nextPlay() {
    this.board.init();
    this.board.displayWithClear();
    this.play();
  }

  play() {
    this.displayScore();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.addPoint();
    this.displayResults();
    if (this.checkMatchEnd() || this.playAgain() === 0) this.displayGoodbyeMessage();
    else {
      this.nextPlay();
    }
  }

  playAgain() {
    let choice;
    while (!['y', 'n'].includes(choice)) {
      let prompt = `Would you like to play again? (y/n): `;
      choice = readline.question(prompt).toLowerCase();
    }
    if (choice === 'y') return 1;
    else return 0;
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }  

  displayScore() {
    console.log(`You: ${this.humanScore.score}`);
    console.log(`Computer: ${this.computerScore.score}`);
  }

  addPoint() {
    if (this.isWinner(this.human)) this.humanScore.addPoint();
    else if (this.isWinner(this.computer)) this.computerScore.addPoint();
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${validChoices.joinOr(", ", "and")}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = null;
    const PWR = TTTGame.POSSIBLE_WINNING_ROWS; // for brevity

    choice = this.smartCheck(this.computer, PWR);
    if (choice === null) choice = this.smartCheck(this.human, PWR);
    if (choice === null) choice = this.pickCenter();
    if (choice === null) choice = this.randomMove();

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  randomMove() {
    let choice = null;
    let validChoices = this.board.unusedSquares();
    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    return choice;
  }

  // while the tutorial step 6 advises to separate out the at risk squares / 
  // winning squares, I find that "smartCheck" is a sufficient method 
  // to run when evaluating the next best move for the computer, since the logic
  // is exactly the same. The logic doesn't know if it's blocking or winning, only
  // that it is looking for an optimal empty square to go through. Would love to
  // get TA feedback on this point. 
  smartCheck(playerToCheck, PWR) {
    let choice = null;
    for (let counter = 0; counter < PWR.length; counter++) {
      let evalRow = PWR[counter];
      if (this.board.countMarkersFor(playerToCheck, evalRow) === 2) {
        let possibleChoiceIdx = evalRow.findIndex(element => 
          this.board.squares[element].isUnused());
        if (possibleChoiceIdx > -1) choice = evalRow[possibleChoiceIdx];
      }
    }
    return choice;
  }

  pickCenter() {
    return (this.board.squares['5'].isUnused()) ? '5' : null;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  checkMatchEnd() {
    if (this.humanScore.score === TTTGame.MATCHES_TO_WIN) {
      console.log('You win the match!');
      return true;
    }
    else if (this.computerScore.score === TTTGame.MATCHES_TO_WIN) {
      console.log('I win the match! Hooray for AI!');
      return true;
    } else {
      return false;
    }
  }

}

let game = new TTTGame();
game.firstPlay(); // Bonus question 2 - invoked firstPlay instead of regular play