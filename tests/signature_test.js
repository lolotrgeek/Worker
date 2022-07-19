const { Account } = require("../src/account")
const { randomUUID } = require('crypto')

const account = new Account()
const { publicKey, privateKey, passphrase } = account.create_account()

let tx = account.create_transaction(randomUUID(), randomUUID(), 1)
console.log(tx)
const signature = account.sign_transaction(privateKey, passphrase, tx)
console.log("signature", signature.toString("base64"))
const isVerified = account.verify_transaction(publicKey, signature, tx)
console.log("Signature verified: ", isVerified)

let converted = signature.toString("base64")
let reverted = Buffer.from(converted, 'base64')

console.log(reverted)
console.log("Successful signature convert/revert: ",reverted.toString("base64") === signature.toString("base64"))