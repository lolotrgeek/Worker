const { randomUUID } = require('crypto')

class Task {
    constructor() {
        this.id = randomUUID()
        this.reward = 0
        this.status = '' // done, doing, completed

        // task types: labor , validate
    }

    complete() {
        // a set of tests to verify that this is complete
    }

    distribute() {
        // the rules for distributing the impact

        // 80% distributed to completer, 20% to verifiers
    }

    generate() {
        // the more other tasks are linked to the product of this task, the more impact this generates

        // downstream value generation trickles up
    }
    update() {

    }
    
    start() {

    }
    
}

module.exports = { Task }