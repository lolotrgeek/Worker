const { Worker } = require("../src/worker")

let worker = new Worker()
let tries = 0
let retrieved
let total = 100

function get_actions_test() {
    tries++
    if (tries >= 4) return console.log(retrieved, "Pass", false)
    retrieved = worker.get_actions()
    let test = Array.isArray(retrieved) && retrieved.length === total
    if (test === false) return setTimeout(get_actions_test, 1000 * tries)
    return console.log(retrieved, "Pass", test)
}


try {
    let created = 0
    let task = worker.create_task()
    while (created < total) {
        if (created >= total) break
        worker.create_action("", task.id)
        created++
    }
} catch (error) {
    console.log(error)
}
finally {
    get_actions_test()
}

