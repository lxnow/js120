const readline = require("readline-sync");

class Card {
  static HIDDEN_CARD = [
    `┌────────────┐`,
    `│ ░░░░░░░░░░ │`,
    `│ ░░░░░░░░░░ │`,
    `│ ░░░░░░░░░░ │`,
    `│ ░░░░░░░░░░ │`,
    `│ ░░░░░░░░░░ │`,
    `│ ░░░░░░░░░░ │`,
    `│ ░░░░░░░░░░ │`,
    `└────────────┘`,
  ];

  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

  show() {
    this.hidden = false;
  }

  getValue() {
    return this.value;
  }

  createGraphicCard() {
    let cardArray = [];
    let VISIBLE_CARD = [
      `┌───────────┐`,
      `│ ${this.suit}         │`,
      `│           │`,
      `│           │`,
      `│    ${this.value.length === 1 ? " " + this.value : this.value}     │`,
      `│           │`,
      `│           │`,
      `│         ${this.suit} │`,
      `└───────────┘`,
    ];

    if (this.hidden === false) {
      VISIBLE_CARD.forEach(element => cardArray.push(element));
    } else {
      Card.HIDDEN_CARD.forEach(element => cardArray.push(element));
    }

    return cardArray;
  }
}

class Deck {
  static CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  static HONOURS = { J: 10, Q: 10, K: 10, A: 11 };
  static SUITS = ['♠', '♥', '♦', '♣'];

  constructor() {
    this.deck = [];
    this.createShuffledDeck(this.deck);
  }

  shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[otherIndex]] = [array[otherIndex], array[index]];
    }

    return array;
  }

  createShuffledDeck(deck) {
    Deck.SUITS.forEach(suit => {
      Deck.CARD_VALUES.forEach(value => {
        deck.push(new Card(suit, value));
      });
    });

    return this.shuffle(deck);
  }

  deal() {
    return this.deck.pop();
  }

  dealHiddenCard() {
    let card = this.deck.pop();
    card.hide();
    return card;
  }
}

class Participant {
  static BUST_SCORE = 21;

  constructor() {
    this.hand = [];
    this.score = 0;
  }

  addCardToHand(card) {
    this.hand.push(card);
  }

  totalScore() {
    let values = this.hand
      .filter(function(card) { return card.hidden === false })
      .map(function(card) { return card.getValue() });

    let total = 0;

    values.forEach(function(value) {
      if (Object.keys(Deck.HONOURS).includes(value)) {
        total += Deck.HONOURS[value];
      } else total += Number(value);
    });

    values
      .filter(function(value) { return value === 'A' })
      .forEach(function() {
        if (total > Participant.BUST_SCORE) total -= 10;
      });

    return total;
  }

  resetHand() {
    this.hand = [];
  }

  displayHand() {
    let handArray = [];
    for (let index = 0; index <= 9; index += 1) {
      handArray.push([]);

      this.hand.forEach(function(card) {
        let graphicCard = card.createGraphicCard();
        handArray[index].push(graphicCard[index]);
      });

      console.log(handArray[index].join('  '));
    }
  }
}

class Player extends Participant {
  static MONEY_START = 5;
  static MONEY_WIN = 10;
  static MONEY_BROKE = 0;

  constructor() {
    super();
    this.money = Player.MONEY_START;
  }

  isBroke () {
    return this.money === Player.MONEY_BROKE;
  }

  isRich () {
    return this.money === Player.MONEY_WIN;
  }

  moneyPlusOne() {
    this.money += 1;
  }

  moneyMinusOne() {
    this.money -= 1;
  }

  playableMoney() {
    return this.money > Player.MONEY_BROKE && this.money < Player.MONEY_WIN;
  }

  getMoney() {
    return this.money;
  }
}

class Dealer extends Participant {
  static MINIMUM_SCORE = 17;
  constructor() {
    super();
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.displayBanner();

    while (this.player.playableMoney()) {
      this.playGame();
 
      if (this.player.isBroke() ||
          this.player.isRich() ||
          !this.playAgain()) break;
    }

    if (this.player.isBroke()) {
      this.displayYoureBroke();
    } else if (this.player.isRich()) {
      this.displayYoureRich();
    }

    this.displayGoodbyeMessage();
  }

  playGame() {
    this.dealCards();
    this.showCardsAndMoney();
    this.playerTurn();
    this.dealerTurn();
    let winner = this.determineWinner();
    this.displayResult(winner);
    this.distributeMoney(winner);
  }

  dealCards() {
    this.deck = new Deck();
    this.player.resetHand();
    this.dealer.resetHand();

    this.player.addCardToHand(this.deck.deal());
    this.dealer.addCardToHand(this.deck.deal());
    this.player.addCardToHand(this.deck.deal());
    this.dealer.addCardToHand(this.deck.dealHiddenCard());
  }

  showCardsAndMoney() {
    this.showCards();
    this.showMoney();
  }

  showMoney() {
    console.log(`You have $${this.player.getMoney()} in the bank. Bet is $1.`);
    console.log('');
  }

  showCards() {
    console.clear();
    this.displayBanner();
    console.log(`Your cards (${this.player.totalScore()}): `);
    this.player.displayHand();
    console.log(`Dealer cards (${this.dealer.totalScore()}): `);
    this.dealer.displayHand();
  }

  playerTurn() {
    while (this.hitAnswer()) {
      this.player.addCardToHand(this.deck.deal());
      this.showCardsAndMoney();
      if (this.isBusted(this.player)) break;
    }
  }

  playAgain() {
    let answer;
    let validAnswers = ['y', 'yes', 'n', 'no'];

    while (true) {
      answer = readline.question("Do you want to keep on playing? (y)es / (n)o: ").toLowerCase();

      if (validAnswers.includes(answer)) break;
      else console.log("Please input 'y' for 'yes' or 'n' for 'no'");
    }

    return answer === 'y' || answer === 'yes';
  }

  hitAnswer() {
    let answer;
    let validAnswers = ['h', 'hit', 's', 'stay'];

    while (true) {
      answer = readline.question('Do you want to (h)it or (s)tay? ').toLowerCase();

      if (validAnswers.includes(answer)) break;
      else console.log("Please input a valid answer 'h' for 'hit' or 's' for 'stay'.");
    }

    return answer === 'h' || answer === 'hit';
  }

  isBusted(participant) {
    return participant.totalScore() > Participant.BUST_SCORE;
  }

  dealerTurn() {
    if (this.isBusted(this.player)) return;
    this.dealer.hand[1].hidden = false;

    while (this.dealer.totalScore() < 17) {
      this.dealer.addCardToHand(this.deck.deal());
    }

    this.showCardsAndMoney();
  }

  displayBanner() {
    console.log(`
**************************************************

             This is TWENTY-ONE!

**************************************************
  `);
  }

  displayYoureBroke() {
    console.log('');
    console.log('--------------------------------------------------------');
    console.log(`Sorry. You have no money left in the bank. You're broke.`);
    console.log('--------------------------------------------------------');
    console.log('');
  }

  displayYoureRich() {
    console.log('');
    console.log('-----------------------------------------------------');
    console.log("You're rich!!! Let's RETIRE on your private island!!!");
    console.log('-----------------------------------------------------');
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log(`Thanks for playing Twenty-One!`);
    console.log('');
  }

  determineWinner() {
    if (this.isBusted(this.player)) return 'dealer';
    else if (this.isBusted(this.dealer)) return 'player';
    else {
      let playerScore = this.player.totalScore();
      let dealerScore = this.dealer.totalScore();

      if (dealerScore > playerScore) return 'dealer';
      else if (dealerScore < playerScore) return 'player';
    }
  }

  distributeMoney(winner) {
    if (winner === 'dealer') this.player.moneyMinusOne();
    else if (winner === 'player') this.player.moneyPlusOne();
    console.log('');
  }

  displayResult(winner) {
    if (this.isBusted(this.player)) {
      console.log(`You busted (${this.player.totalScore()} points)! Dealer wins!`);
      console.log(`You lost $1. $${this.player.getMoney() - 1} left in the bank.`);
    } else if (this.isBusted(this.dealer)) {
      console.log((`Dealer busted (${this.dealer.totalScore()} points)!, You win.`));
      console.log(`You win $1. $${this.player.getMoney() + 1} in the bank.`);
    } else {
      if (winner === 'dealer') {
        console.log(`Dealer wins with ${this.dealer.totalScore()} points.`);
        console.log(`You lost $1. $${this.player.getMoney() - 1} left in the bank.`);
      } else if (winner === 'player') {
        console.log(`You win with ${this.player.totalScore()} points.`);
        console.log(`You win $1. $${this.player.getMoney() + 1} in the bank.`);
      } else {
        console.log(`It's a tie.`);
      }
    }

    console.log('');
  }
}

let game = new TwentyOneGame();
game.start();