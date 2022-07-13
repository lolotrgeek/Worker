const { Account } = require("../src/account");
const { randomUUID } = require('crypto')

const account = new Account()

let tx = account.create_transaction(randomUUID(), randomUUID(), 1)
console.log(tx)

