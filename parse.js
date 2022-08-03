export function parse(benchmark, name) {
  const mem = benchmark.memUsage.reduce(
    (acc, b) => acc + +b.heapUsed / b.heapTotal,
    0
  );
  const cpu = benchmark.cpuUsage.reduce((acc, b) => acc + +b.system, 0);
  return {
    name,
    mem: ((mem / benchmark.memUsage.length) * 100).toFixed(2) + "%",
    cpu: (cpu / benchmark.cpuUsage.length).toFixed(2),
  };
}
