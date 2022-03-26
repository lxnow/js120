let readline = require('readline-sync');

class Card {
  static SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
  static CARD_ASSIGNMENTS = {
    A: [1, 11],
    2: [2],
    3: [3],
    4: [4],
    5: [5],
    6: [6],
    7: [7],
    8: [8],
    9: [9],
    10: [10],
    J: [10],
    Q: [10],
    K: [10],
  }

  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.rankPointsArr = this.assignRankPoints(this.value);
  }

  assignRankPoints(value) {
    return Card.CARD_ASSIGNMENTS[value];
  }
}

class Deck {
  // static CARDS_IN_DECK = 52; // we are only using one deck;
  // static CARDS_DEALT = 2;

  constructor() {
    this.cards = []; //array of card objects; QUESTION: why does the array
    // contain two level layers of array? Have to access [0] to get card
    // properties. This apears to happen in `new` when we init deck
    this.cardCount = this.updateCardCount();
    this.init();
  }

  init() {
    this.cards = [];
    this.shuffleDeck();
    this.cardCount = this.updateCardCount();
  }

  deal(participant, cardsInPlay) {
    if (this.cardCount < TwentyOneGame.MIN_NUM_OF_CARDS_IN_DECK) {
      this.shuffleDeck(cardsInPlay);
    }

    let choice = Math.floor(Math.random() * this.cards.length);
    participant.hand.push(this.cards.splice(choice, 1));

    this.cardCount = this.updateCardCount();
  }

  updateCardCount() {
    return Object.keys(this.cards).length;
  }

  checkCardInPlay(cardsInPlay, card) {
    for (let counter = 0; counter < cardsInPlay.length; counter += 1) {
      if (cardsInPlay[counter].suit === card.suit
        && cardsInPlay[counter].value === card.value) return true;
    }
    return false;
  }

  shuffleDeck(cardsInPlay = []) {
    console.log(`\x1b[33mRunning out of cards. Reshuffling deck...\x1b[0m`);
    for (let suitCounter = 0; suitCounter < Card.SUITS.length;
      suitCounter += 1) {
      for (let cardCounter = 0;
        cardCounter < Object.keys(Card.CARD_ASSIGNMENTS).length;
        cardCounter += 1) {
        let card = new Card(Card.SUITS[suitCounter],
          Object.entries(Card.CARD_ASSIGNMENTS)[cardCounter][0]);
        if (!this.checkCardInPlay(cardsInPlay, card) &&
          !this.checkCardInPlay(this.cards, card)) {
          this.cards.push(card);
        }
      }
    }
    this.cardCount = this.updateCardCount();
  }

}

class Participant {
  constructor() {
    this.init();
  }

  init() {
    this.hand = [];
    this.handValue = 0;
  }

  isBusted() {
    if (this.getBestValue()) return false;
    else return true;
  }

  score() {
    if (this.isBusted()) return this.getHandBustValue();
    else return this.getBestValue();
  }

  getHand() {
    return this.hand;
  }

  getBestValue() {
    let bestValue;
    this.getHandPossibleTotals().forEach(element => {
      if (element <= TwentyOneGame.BUST_THRESHOLD) bestValue = element;
    });
    return bestValue;
  }

  getHandPossibleTotals() {
    let handPoints = this.extractHandPoints(this.hand);
    let possibleTotals = this.calcHandPossibleTotals(handPoints);
    possibleTotals.sort((a, b) => a - b);
    return possibleTotals;
  }

  getHandBustValue() {
    return this.getHandPossibleTotals()[0];
  }

  extractHandPoints(arrayOfObjects) {
    let resultsArray = [];
    arrayOfObjects.forEach(element => {
      resultsArray.push(element[0].rankPointsArr);
    });
    return resultsArray;
  }

  calcHandPossibleTotals(hand, curIdx = 0, curSum = 0, resultsArray = []) {
    if (curIdx === hand.length) {
      resultsArray.push(curSum);
      return;
    }

    if (hand[curIdx].length === 2) {
      let branchSum1 = curSum + hand[curIdx][0];
      let branchSum2 = curSum + hand[curIdx][1];
      curIdx += 1;
      this.calcHandPossibleTotals(hand, curIdx, branchSum1, resultsArray);
      this.calcHandPossibleTotals(hand, curIdx, branchSum2, resultsArray);
    } else {
      curSum += hand[curIdx][0];
      curIdx += 1;
      curSum = this.calcHandPossibleTotals(hand, curIdx, curSum, resultsArray);
    }
    return resultsArray;
  }

  getHandValues(hand) {
    return hand.map(element => element[0].value);
  }
}

class Player extends Participant {
  static STARTING_MONEY = 5;
  static AUTOLOSE_BALANCE = 0;
  static AUTOWIN_BALANCE = 10;
  static MONEY_INCREMENT = 1;

  constructor() {
    super();
    this.money = Player.STARTING_MONEY;
  }

  hit(game) {
    console.clear();
    console.log(`'Hit me!' you proclaim boldly.`);
    game.deck.deal(this, game.cardsInPlay());
  }

  updateBalance(winner) {
    if (winner === this) this.money += Player.MONEY_INCREMENT;
    else if (winner === 'tie') this.money += 0;
    else this.money -= Player.MONEY_INCREMENT;
  }
}

class Dealer extends Participant {
  static HIT_THRESHOLD = 17;

  constructor() {
    super();
  }

  hit(game) {
    console.log(`\nDealer \x1b[1mHITS\x1b[0m!`);
    game.deck.deal(this, game.cardsInPlay());
  }

  stay(game) {
    console.log(`\nDealer stays.`);
    game.displayDealerHand();

  }
}

class TwentyOneGame {
  static MIN_NUM_OF_CARDS_IN_DECK = 5;
  static WINNING_MONEY = 10;
  static BUST_THRESHOLD = 21;

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  start() {
    this.displayWelcomeMessage();
    while (true) {
      this.initParticipants();
      this.displayBalance();
      this.dealCards();
      this.showCards();
      this.playerTurn();
      if (!this.player.isBusted()) this.dealerTurn();
      this.showAllCards();
      this.displayResult(this.evaluateWinner());
      this.player.updateBalance(this.evaluateWinner());
      if (this.autoEnd()) break;
      if (!this.playAgain()) break;
      this.displayPlayAgainMsg();
    }
    this.displayGoodbyeMessage();
  }

  initParticipants() {
    this.player.init();
    this.dealer.init();
  }

  dealCards() {
    if (this.deck.cardCount < TwentyOneGame.MIN_NUM_OF_CARDS_IN_DECK) {
      this.deck.shuffleDeck();
    }
    for (let counter = 0; counter < 2; counter += 1) {
      this.deck.deal(this.player, this.cardsInPlay());
      this.deck.deal(this.dealer, this.cardsInPlay());
    }
  }

  showCards() {
    console.log(`The dealer shows ${this.dealer.hand[0][0].value}, and ${this.dealer.hand.length - 1} card face down`);
    console.log(`Your cards are ${this.joinOr(this.player.getHandValues(this.player.hand))}`);
    console.log(`Your hand is \x1b[92m${this.player.score()}\x1b[0m`);
  }

  joinOr(choicesArr, delimiter = ', ', finalDelimiter = 'and') {
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

  playerTurn() {
    while (true) {
      let playerMove = this.askMove();
      if (playerMove === 'h' || playerMove === 'hit') {
        this.player.hit(this, this.cardsInPlay());
        this.showCards();
        if (this.player.isBusted()) break;
      } else return;
    }
  }

  askMove() {
    let playerMove;
    while (true) {
      playerMove = readline.question(`Do you \x1b[1m(h)\x1b[0mit or \x1b[1m(s)\x1b[0mtay? `).toLowerCase();
      if (playerMove === 'h' || playerMove === 'hit' || playerMove === 's' || playerMove === 'stay') return playerMove;
      console.log('Not a valid move, please try again (enter "\x1b[1mh\x1b[0m" or "\x1b[1ms\x1b[0m")');
    }
  }

  dealerTurn() {
    this.displayDealerTurnMsg();
    while (!this.dealer.isBusted()) {
      if (this.dealer.getBestValue() < Dealer.HIT_THRESHOLD) {
        this.dealer.hit(this, this.cardsInPlay());
        this.displayDealerHand();
      } else break;
    }
    if (this.dealer.isBusted()) return;
    else this.dealer.stay(this);
  }

  cardsInPlay() {
    return this.player.hand.concat(this.dealer.hand);
  }

  evaluateWinner() {
    if (this.player.isBusted()) return this.dealer;
    else if (this.dealer.isBusted()) return this.player;
    else if (this.player.getBestValue() > this.dealer.getBestValue()) {
      return this.player;
    } else if (this.player.getBestValue() < this.dealer.getBestValue()) {
      return this.dealer;
    } else return 'tie';
  }

  displayDealerTurnMsg() {
    console.clear();
    console.log(`It's the dealer's turn, and she reveals her cards...`);
    this.displayDealerHand();
  }

  showAllCards() {
    console.log(`\nBoth players reveal their cards...`);
    console.log(`Dealer has \x1b[91m${this.dealer.score()}\x1b[0m with ${this.joinOr(this.dealer.getHandValues(this.dealer.hand))}`);
    console.log(`You have \x1b[92m${this.player.score()}\x1b[0m with ${this.joinOr(this.player.getHandValues(this.player.hand))}`);
  }

  displayDealerHand() {
    console.log(`Dealer's cards: ${this.joinOr(this.dealer.getHandValues(this.dealer.hand))}`);
    console.log(`Dealer's hand is \x1b[91m${this.dealer.score()}\x1b[0m`);
  }

  displayPlayerHand() {
    console.log(`Your cards: ${this.joinOr(this.player.getHandValues(this.player.hand))}`);
    console.log(`Your hand is \x1b[92m${this.player.score()}\x1b[0m`);
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(`\x1b[1mLet's play lxnow's OOO game of 21!\x1b[0m`);
    console.log(`----------------------------------`);
    console.log(`Dealer shuffles the deck...`);
    console.log(`Dealer deals cards...`);
  }

  displayGoodbyeMessage() {
    console.log(`\nThank you for playing 21 with me. -lxnow\n`);
  }

  displayResult(winner) {
    if (winner === 'tie') console.log(`\x1b[90mIt's a tie. No one wins\x1b[0m\n`);
    if (this.player.isBusted()) console.log(`\x1b[91mYou busted! Dealer wins\x1b[0m.\n`);
    if (this.dealer.isBusted()) console.log(`\x1b[92mDealer busts! You win.\x1b[0m\n`);
    if (winner === this.player && !this.dealer.isBusted()) console.log(`\x1b[92mYou win! Congratulations!\x1b[0m\n`);
    if (winner === this.dealer && !this.player.isBusted()) console.log(`\x1b[91mDealer wins! Too bad.\x1b[0m\n`);
  }

  playAgain() {
    let answer;
    while (answer !== 'y' && answer !== 'n' && answer !== 'yes' && answer !== 'no') {
      answer = readline.question('Would you like to play again? (\x1b[1my\x1b[0m)es or (\x1b[1mn\x1b[0mo): ');
      answer = answer.toLowerCase();
      if (answer !== 'y' && answer !== 'n' && answer !== 'yes' && answer !== 'no') console.log("Invalid response. Let's try that again.");
    }
    if (answer === 'y' || answer === 'yes') return true;
    else if (answer === 'n' || answer === 'no') return false;
    return true;
  }

  displayPlayAgainMsg() {
    console.clear();
    console.log(`Great! Let's play again!`);
    console.log(`\x1b[90mRemaining cards in deck: ${this.deck.cardCount}\x1b[0m`);
    console.log(`Dealer deals cards from the same deck...\n`);
  }

  displayBalance() {
    console.log(`You have $${this.player.money}.\n`);
  }

  autoEnd() {
    if (this.player.money === Player.AUTOLOSE_BALANCE ||
      this.player.money === Player.AUTOWIN_BALANCE) {
      this.displayBalance();
      this.displayAutoEnd();
      return true;
    } else return false;
  }

  displayAutoEnd() {
    if (this.player.money === Player.AUTOLOSE_BALANCE) {
      console.log(`You automatically lose. We're ending this game.`);
    } else console.log('You automatically win! Congrats!');
  }

}

let game = new TwentyOneGame();
game.start();