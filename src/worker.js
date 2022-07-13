const { randomUUID } = require('crypto')
const { Ledger } = require('basic-ledger')
const { Task } = require('./src/task')

class Worker {
    constructor() {
        this.id = randomUUID()
        this.ledger = new Ledger(this.id)
        
        // store the public key of account on the ledger

        // TODO: listen for tasks, choose ones we'd "like" to do.

    }

    create_task() {
        let task = new Task()
        this.ledger.put(task.id, task)
    }

    find_task() {
        let entries = this.ledger.get_all()
        console.log(entries)
    }

    redeem() {
        

        // transaction: convert impact to stake

        // get amount of impact this address has in ledger
        
        // give me the private key to sign this transaction

        // post to ledger as a task to validate

        // validation = does private

    }

    update() {

    }

}

module.exports = { Worker }