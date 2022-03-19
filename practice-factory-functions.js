function createInvoice(obj = {}) {
  return {
    phone: obj.phone ? obj.phone : 3000,
    internet: obj.internet ? obj.internet : 5500,
    total() {
      return this.phone + this.internet;
    },
    payments: [],
    addPayment(paymentObj = {}) {
      this.payments.push(paymentObj);
    },
    addPayments(paymentsArr = []) {
      paymentsArr.forEach(element => {
        this.payments.push(element);
      });
    },
    amountDue() {
      return this.total() - paymentTotal(this.payments);
    },
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

// console.log(invoiceTotal(invoices)); // 31000

function createPayment(services = {}) {
  return {
    internet: services.internet ? services.internet : 0,
    phone: services.phone ? services.phone : 0,
    total() {
      return services.amount ? services.amount : this.internet + this.phone;
    },
  }
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

// console.log(paymentTotal(payments));      // => 24000

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0
