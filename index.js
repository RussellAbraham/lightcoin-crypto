class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((balance, transaction) => balance + transaction.value, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(transactionAmount, currentAccount) {
    this.transactionAmount = transactionAmount;
    this.account = currentAccount;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.transactionAmount;
  }

  isAllowed() {
    return this.account.balance - this.transactionAmount >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.transactionAmount;
  }

  isAllowed() {
    return true;
  }
}

// DRIVER CODE
const myAccount = new Account("myUsername");

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const withdrawal1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', withdrawal1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const deposit1 = new Deposit(9.99, myAccount);
console.log('Commit result:', deposit1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const withdrawal2 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', withdrawal2.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Looks like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
