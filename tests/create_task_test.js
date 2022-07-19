const { Worker } = require("../src/worker");

let worker = new Worker()
let finder = new Worker()

let task = worker.create_task()

let tries = 0
function find() {
    tries++
    if(tries > 4) return console.log("Pass:", false)
    let found_task = finder.get_task(task.id)
    if(found_task) return console.log("Pass", found_task.value.id === task.id, found_task)
    if(!found_task) setTimeout(find, 1000)
}
find()