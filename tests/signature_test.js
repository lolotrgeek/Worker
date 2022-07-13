const { Account } = require("../src/account")
const { randomUUID } = require('crypto')

const account = new Account()

let tx = account.create_transaction(randomUUID(), randomUUID(), 1)
console.log(tx)
const signature = account.sign_transaction(account.privateKey, account.passphrase, tx)
console.log("signature", signature.toString("base64"))
const isVerified = account.verify_transaction(account.publicKey, signature, tx)
console.log("signature verified: ", isVerified)