import { interval, iteration } from "./const";
import { parse } from "./parse";
import printer from "./printer";
import sleep from "./sleep";

const benchmark = {
  name: "WithWhile",
  cpuUsage: [],
  memUsage: [],
};

async function withWhile() {
  let i = 0;
  while (++i <= iteration) {
    benchmark.cpuUsage.push(process.cpuUsage());
    benchmark.memUsage.push(process.memoryUsage());
    await sleep(interval);
    printer("While");
  }
}

(() => {
  const start = Date.now();
  console.log("While locked at ", start);
  const p = withWhile();

  p.then(() => {
    console.log("Unlocked with ", (Date.now() - start) / 1000, "s");
    console.table(parse(benchmark, "while"));
  });
})();
