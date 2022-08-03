import { Worker } from "worker_threads";

const workers = [
  new Worker("./while.js"),
  new Worker("./interval.js"),
  new Worker("./timeout.js"),
];

workers.forEach((worker) => {
  worker.on("message", (d) => {
    console.log(d);
  });
});
