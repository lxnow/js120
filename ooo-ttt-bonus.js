let readline = require('readline-sync');

class Square {
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker) {
    this.marker = `\x1b[30m${marker}\x1b[0m`;
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
    return (this.marker !== Square.HUMAN_MARKER
      && this.marker !== Square.COMPUTER_MARKER);
  }

}

class Board {
  constructor() {
    this.squares = {};
    this.init();
  }

  init() {
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square(counter);
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
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  addPoint() {
    this.score += 1;
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


class TTTGame {
  static MATCHES_TO_WIN = 3;
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;

  }
  // Bonus question 2 below until method `playAgain()`. Two new methods, one for
  // the first game, which shows a welcome message, and a `nextPlay` method for
  // any subsequent games. Both methods call the modified `play` method which
  // goes through the same logic as before, except it adds a `playAgain`
  // question in the end. If user selects 'y', we init() the board
  firstPlay() {
    this.displayWelcomeMessage();
    this.board.display();
    this.displayScore();
    this.play();
  }

  nextPlay() {
    this.board.init();
    this.firstPlayer = this.togglePlayer(this.firstPlayer);
    this.board.displayWithClear();
    this.displayScore();
    this.play();
  }

  play() {
    let currentPlayer = this.firstPlayer;
    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;
      this.board.displayWithClear();
      this.displayScore();
      currentPlayer = this.togglePlayer(currentPlayer);
    }
    this.board.displayWithClear();
    this.addPoint();
    this.displayResults();
    if (this.checkMatchEnd() || this.playAgain() === 0) this.displayByeMsg();
    else {
      this.nextPlay();
    }
  }

  togglePlayer(player) {
    if (player === this.human) return this.computer;
    else return this.human;
  }

  playerMoves(player) {
    if (player === this.human) this.humanMoves();
    else this.computerMoves();
  }

  playAgain() {
    let choice;
    while (!['y', 'n', 'yes', 'no'].includes(choice)) {
      let prompt = `Would you like to play again? (\x1b[1my\x1b[0m/\x1b[1mn\x1b[0m]): `;
      choice = readline.question(prompt).toLowerCase();
    }
    if (choice[0] === 'y') return 1;
    else return 0;
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("\x1b[1m\x1b[93mWelcome to Tic Tac Toe!\x1b[0m");
    console.log(`First to ${TTTGame.MATCHES_TO_WIN} wins the match.`);
    console.log("");
  }

  displayByeMsg() {
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
    console.log(`You: \x1b[33m${this.human.score}\x1b[0m`);
    console.log(`Computer: \x1b[33m${this.computer.score}\x1b[0m`);
  }

  addPoint() {
    if (this.isWinner(this.human)) this.human.addPoint();
    else if (this.isWinner(this.computer)) this.computer.addPoint();
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
      const prompt = `Choose a square (${this.joinOr(validChoices, ", ", "and")}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  joinOr(choicesArr, delimiter = ', ', finalDelimiter = 'or') {
    if (choicesArr.length === 1) return choicesArr.toString();
    else if (choicesArr.length === 2) return choicesArr[0] + ' ' +
      finalDelimiter + ' ' + choicesArr[1];
    else {
      let stringResult = '';
      for (let counter = 0; counter < choicesArr.length - 1; counter++ ) {
        stringResult = stringResult + choicesArr[counter] + delimiter;
      }
      stringResult = stringResult +  finalDelimiter + ' ' +
      choicesArr[choicesArr.length - 1];
      return stringResult;
    }
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
  // is exactly the same. The logic doesn't know if blocking or winning, only
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
    if (this.human.score === TTTGame.MATCHES_TO_WIN) {
      this.printMatchWinner(this.human);
      return true;
    } else if (this.computer.score === TTTGame.MATCHES_TO_WIN) {
      this.printMatchWinner(this.computer);
      return true;
    } else {
      return false;
    }
  }

  printMatchWinner(player) {
    if (player === this.human) console.log('You win the match!');
    else if (player === this.computer) console.log('I win the match! Hooray for AI!');
  }

}

let game = new TTTGame();
game.firstPlay(); // Bonus question 2 - invoked firstPlay instead of regular play