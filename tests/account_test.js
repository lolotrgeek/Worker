const { Account } = require("../src/account")

const account = new Account()
const { publicKey, privateKey, passphrase } = account.create_account()
const get_account = account.retrieve_account(new_account.passphrase)


// attempt to retrieve account with passphrase
if(new_account.privateKey === get_account.privateKey) console.log("retrieved!")
else console.log("not retrieved.")

