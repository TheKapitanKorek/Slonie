const readLine = require("readline");
let rl = readLine.createInterface({
  input: process.stdin,
  terminal: false
});
const data = [];
rl.on("line", function(line) {
  data.push(line);
});
rl.on("close", function() {
  const [
    numberOfElephants,
    elephantsWeights,
    currentLine,
    desiredLine
  ] = data.map(el => el.split(/\s/));
  weightsParsed = elephantsWeights.map(el => parseInt(el));
  const globalMin = getMin(weightsParsed);
  const chains = findChains(currentLine, desiredLine, numberOfElephants);
  const finalSum = chains
    .map(chain => {
      const matched = chain.map(el => weightsParsed[parseInt(el) - 1]);
      const sum = matched.reduce((a, b) => a + b);
      const min = getMin(matched);
      const sum1 = sum + (matched.length - 2) * min;
      const sum2 = sum + (matched.length + 1) * globalMin + min;
      return Math.min(sum1, sum2);
    })
    .reduce((a, b) => a + b);
  console.log(finalSum);
  process.exit(0);
});

function getMin(arr) {
  let len = arr.length;
  let min = Infinity;
  while (len--) {
    min = arr[len] < min ? arr[len] : min;
  }
  return min;
}
function findChains(cur, des, n) {
  const p = [];
  for (let i = 0; i < n; i++) {
    p[des[i] - 1] = cur[i];
  }
  const odw = [];
  for (let i = 0; i < n; i++) {
    odw.push(false);
  }
  let c = 0;
  const chains = [];
  for (let i = 0; i < n; i++) {
    if (!odw[i]) {
      c = c + 1;
      let x = i;
      const chain = [];
      while (!odw[x]) {
        odw[x] = true;
        chain.push(x + 1);
        x = p[x] - 1;
      }
      chains.push(chain);
    }
  }
  return chains;
}
