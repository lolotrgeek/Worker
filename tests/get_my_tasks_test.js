const { Worker } = require("../src/worker")

let worker = new Worker()
let worker2 = new Worker()

let tries = 0
let retrieved
let total = 50

function get_mytasks_test() {
    tries++
    if (tries >= 4) return console.log(retrieved, "Pass", false)
    retrieved = worker.get_tasks()
    let test = Array.isArray(retrieved) && retrieved.length === total
    if (test === false) return setTimeout(get_mytasks_test, 1000 * tries)
    return console.log(retrieved, "Pass", test)
}


try {
    let created = 0
    while (created < total) {
        if (created >= total) break
        worker.create_task()
        worker2.create_task()
        created++
    }
} catch (error) {
    console.log(error)
}
finally {
    get_mytasks_test()
}

