const { Worker } = require("../src/worker")

let worker = new Worker()

let tx = worker.redeem(1)