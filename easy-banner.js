class Banner {
  constructor(message, width = 0) {
    this.message = message;
    this.adjLeft = 0;
    this.adjRight = 0;
    this.initSides(width);
  }

  initSides(width) {
    if (this.message.length > width) this.widnnth = this.message.length;
    else {
      this.width = width;
      let additionalSpaces = width - this.message.length;
      if (width % 2 === 0) {
        this.adjLeft = additionalSpaces / 2;
        this.adjRight = additionalSpaces / 2;
      } else {
        this.adjLeft = Math.floor(additionalSpaces / 2);
        this.adjRight = Math.ceil(additionalSpaces /2);
      }
    }
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.width)}-+`;
  }

  emptyLine() {
    return `| ${' '.repeat(this.width)} |`;
  }

  messageLine() {
    return `| ${' '.repeat(this.adjLeft)}${this.message}${' '.repeat(this.adjRight)} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();


let banner2 = new Banner('');
banner2.displayBanner();

let banner3 = new Banner('I want to go upstairs now.', 40)
banner3.displayBanner();

/*
problem: 
let counter iterate up
adding a - each time
then retrnt he adjusted rule as the horizontal rule
*/