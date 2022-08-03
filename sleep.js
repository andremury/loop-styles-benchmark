export default function sleep(t = 100) {
  return new Promise((r) =>
    setTimeout(() => {
      r(true);
    }, t)
  );
}
