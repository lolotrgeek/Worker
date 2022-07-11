const { randomUUID } = require('crypto')
const { Ledger } = require('basic-ledger')
const { Task } = require('./task')

class Worker {
    constructor() {
        this.id = randomUUID()
        this.ledger = new Ledger(this.id)
        // Everything is recorded in the ledger.

        // TODO: listen for tasks, choose ones we'd "like" to do.

    }

    create_task() {
        let task = new Task()
        this.ledger.put(task.id, task)
    }

    find_task(){
        let entries = this.ledger.get_all()
        console.log(entries)
    }

    redeem() {

    }

    update() {

    }

}

module.exports = { Worker }