const { Worker } = require("../src/worker")

let worker = new Worker()
let tries = 0
let retrieved
let total = 100

function get_tasks_test() {
    tries++
    if (tries >= 4) return console.log(retrieved, "Pass", false)
    retrieved = worker.get_tasks()
    let test = Array.isArray(retrieved) && retrieved.length === total
    if (test === false) return setTimeout(get_tasks_test, 1000 * tries)
    return console.log(retrieved, "Pass", test)
}


try {
    let created = 0
    while (created < total) {
        if (created >= total) break
        worker.create_task()
        created++
    }
} catch (error) {
    console.log(error)
}
finally {
    get_tasks_test()
}

