'use strict'
const { randomUUID } = require('crypto')
const { Ledger } = require('basic-ledger')
const { Task } = require('./task')
const { Account } = require('./account')
const { Action } = require('./action')

class Worker {
    constructor() {
        this.id = randomUUID()
        this.ledger = new Ledger(this.id)
        this.account = new Account()

        const { publicKey, privateKey, passphrase } = this.account.create_account()

        this.publicKey = publicKey
        this.privateKey = privateKey // TODO: remove
        this.passphrase = passphrase // TODO: remove

    }

    create_task() {
        const task = new Task(this.id)
        this.ledger.put(task.id, task)
        return task
    }

    get_task(task_id) {
        return this.ledger.get(task_id)
    }

    is_task(entry) {
        return typeof entry.key === 'string' && entry.key.slice(0, 4) === 'task'
    }

    get_tasks(filter) {
        let entries = this.ledger.get_all()
        return entries.filter(entry => this.is_task(entry) && filter ? filter(entry) : true).map(entry => entry.value)
    }

    get_my_tasks() {
        return this.get_tasks(task => task.creator === this.id)
    }

    get_impact() {

    }

    create_action(data, task_id) {
        const action = new Action(data, task_id, this.id)
        this.ledger.put("action", action)
    }

    redeem(amount) {
        // the mechanism for converting impact to stake is sending impact to self
        let tx = this.account.create_transaction(this.id, this.id, amount)
        let signature = this.account.sign_transaction(this.privateKey, this.passphrase, tx)
        let signed_tx = { tx, sig: signature.toString("base64") }
        this.ledger.put("tx", signed_tx)
    }

}

module.exports = { Worker }