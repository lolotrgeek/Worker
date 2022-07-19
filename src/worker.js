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

    create_action(data, task_id) {
        const action = new Action(data, task_id, this.id)
        this.ledger.put(action.id, action)
        return action
    }

    get_task(task_id) {
        return this.ledger.get(task_id)
    }

    is_task(entry) {
        return typeof entry === 'object' && typeof entry.key === 'string' && entry.key.slice(0, 4) === 'task'
    }

    get_tasks(filter) {
        let entries = this.ledger.get_all()
        let run_filter = entry => filter ? filter(entry) : true
        return entries.filter(entry => this.is_task(entry) && run_filter(entry)).map(entry => entry.value)
    }

    get_my_tasks() {
        return this.get_tasks(entry => typeof entry.value.creator === 'string' && entry.value.creator === this.id)
    }

    is_action(entry) {
        return typeof entry === 'object' && typeof entry.key === 'string' && entry.key.slice(0,6) === 'action'
    }

    get_actions(filter) {
        let entries = this.ledger.get_all()
        let run_filter = entry => filter ? filter(entry) : true
        return entries.filter(entry => this.is_action(entry) && run_filter(entry)).map(entry => entry.value)
    }

    get_my_actions() {
        return this.get_actions(entry => typeof entry.value.worker_id === 'string' && entry.value.worker_id === this.id)
    }

    get_impact() {
        
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