import { interval, iteration } from "./const";
import { parse } from "./parse";
import printer from "./printer";

const benchmark = {
  name: "WithInterval",
  cpuUsage: [],
  memUsage: [],
};

async function withInterval() {
  return new Promise((r) => {
    let i = 0;
    const iv = setInterval(() => {
      ++i;
      benchmark.cpuUsage.push(process.cpuUsage());
      benchmark.memUsage.push(process.memoryUsage());
      printer("setInterval");

      if (i >= iteration) {
        clearInterval(iv);
        r(true);
      }
    }, interval);
  });
}

(() => {
  const start = Date.now();
  console.log("Interval locked at ", start);
  const p = withInterval();

  p.then(() => {
    console.log("Unlocked with ", (Date.now() - start) / 1000, "s");
    console.table(parse(benchmark));
  });
})();
