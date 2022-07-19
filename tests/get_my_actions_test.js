const { Worker } = require("../src/worker")

let worker = new Worker()
let worker2 = new Worker()
let task = worker.create_task()
let tries = 0
let retrieved
let total = 50

function get_my_actions_test() {
    tries++
    if (tries >= 4) return console.log(retrieved, "Pass", false)
    retrieved = worker.get_my_actions()
    let test = Array.isArray(retrieved) && retrieved.length === total
    if (test === false) return setTimeout(get_my_actions_test, 1000 * tries)
    return console.log(retrieved, "Pass", test)
}


try {
    let created = 0
    while (created < total) {
        if (created >= total) break
        worker.create_action("", task.id)
        worker2.create_action("", task.id)
        created++
    }
} catch (error) {
    console.log(error)
}
finally {
    console.log(worker.get_actions())
    get_my_actions_test()
}

