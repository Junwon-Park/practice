const add = (n1: number, n2: number, showResult: boolean, phrase: string) => {
  const result = n1 + n2;
  if (showResult) console.log(phrase + result);
  return result;
};

const number1 = 5;
const number2 = 2.8;
const printResult = true;
let resultPhrase = "Result is ";
let number3: number = 1;
resultPhrase = 3;

const result = add(number1, number2, printResult, resultPhrase);
