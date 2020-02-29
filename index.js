const fs = require("fs");
const args = process.argv;
if (args[2] && !args[3]) {
  const text = fs.readFileSync(args[2]).toString();
  const [
    numberOfElephants,
    elephantsWeights,
    currentLine,
    desiredLine
  ] = text.split(/\n/).map(el => el.split(/\s/));
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
  return finalSum;
} else {
  console.log(
    `Please specidy the input file directory as follows: ./ZadanieRekrutacyjne.exe yourInputFile.in`
  );
}
function getMin(arr) {
  let len = arr.length;
  let min = Infinity;
  while (len--) {
    min = arr[len] < min ? arr[len] : min;
  }
  return min;
}

function findChains(current, desired, numb) {
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
      chains.push(chain);
    }
  }
  return chains;
}
