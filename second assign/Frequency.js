const numbers = [7, 7, 1, 2, 3, 1, 3, 2, 5];

const numbersWithoutRepeation = [];

for (let i = 0; i < numbers.length; i++) {
  let count = 0;
  for (let j = i + 1; j < numbers.length - 1; j++) {
    if (numbers[i] === numbers[j]) {
      count++;
    }
  }
  if (count < 1) {
    numbersWithoutRepeation.push(numbers[i]);
  }
}

const countFrek = (number) => {
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (number === numbers[i]) {
      count++;
    }
  }
  return count;
};

console.log(numbersWithoutRepeation);

let repetaionNumbers = [];

for (let i = 0; i < numbersWithoutRepeation.length; i++) {
  repetaionNumbers.push(countFrek(numbersWithoutRepeation[i]));
}

console.log(repetaionNumbers);
