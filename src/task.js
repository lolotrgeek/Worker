const { randomUUID } = require('crypto')

class Task {
    constructor(creator) {
        this.id = "task_"+randomUUID()
        this.creator = creator ? creator : ""
        this.reward = 0
        this.status = '' // done, doing, completed

        // task types: labor , validate
    }

    conditions() {
        return true
    }

}

module.exports = { Task }