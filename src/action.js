const { randomUUID } = require('crypto')

class Action {
    constructor(data, task_id, worker_id) {
        this.id = "action_"+randomUUID()
        this.task_id = task_id
        this.worker_id = worker_id
        this.action = data
    }
}

module.exports = { Action }