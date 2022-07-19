'use strict'
const { generateKeyPairSync, createHash, sign, verify } = require('crypto')
const { generate } = require('generate-passphrase')

class Account {
    constructor() {
        // TODO: create an encrypted object to store private key that can be unlocked with passphrase
    }
    
    create_account() {
        const passphrase = generate({ length: 32, numbers: false })
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem', cipher: 'aes-256-cbc', passphrase }
        })
        return { publicKey, privateKey, passphrase }
    }
    /**
     * 
     * @param {string} from public key of sender
     * @param {*} to public key of recepient
     * @param {float} amount 
     * @returns 
     */
    create_transaction(from, to, amount) {
        return JSON.stringify({ id:createHash('sha256').update(from+to+amount).digest('hex') , from, to, amount})
    }

    sign_transaction(privateKey, passphrase, transaction) {
        return sign("sha256", Buffer.from(transaction), {key: privateKey, passphrase})
    }

    verify_transaction(publicKey, signature, transaction) {
        return verify("sha256", Buffer.from(transaction), publicKey, signature)
    }

}

module.exports = { Account }