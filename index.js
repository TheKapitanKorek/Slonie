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

findChains = (current, desired, numb) => {
  const c = [...current];
  const d = [...desired];
  const chains = [];
  for (let i = 0; i < numb; i++) {
    if (c[i] !== "#") {
      const chain = [];
      let curIndex = i;
      do {
        chain.push(c[curIndex]);
        const nextIndex = d.indexOf(`${c[curIndex]}`);
        c[curIndex] = "#";
        curIndex = nextIndex;
      } while (i !== curIndex);
      console.log("chain found");
      chains.push(chain);
    }
  }
  return chains;
};
