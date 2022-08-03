import { interval, iteration } from "./const";
import { parse } from "./parse";
import printer from "./printer";

const benchmark = {
  name: "WithTimeout",
  cpuUsage: [],
  memUsage: [],
};

function withTimeout() {
  return new Promise((r) => {
    const run = (i = 0) => {
      setTimeout(() => {
        benchmark.cpuUsage.push(process.cpuUsage());
        benchmark.memUsage.push(process.memoryUsage());

        if (i <= iteration) {
          run(++i);
        } else {
          r(true);
        }
      }, interval);
    };
    run();
  });
}

(() => {
  const start = Date.now();
  console.log("Timeout Locked at ", start);
  const p = withTimeout();
  p.then(() => {
    console.log("Unlocked with ", (Date.now() - start) / 1000, "s");
    console.table(parse(benchmark));
  });
})();
