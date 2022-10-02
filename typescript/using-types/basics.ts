const add = (n1: number, n2: number, showResult: boolean, phrase: string) => {
  const result = n1 + n2;
  if (showResult) console.log(phrase + result);
  else return result;
};

const number1 = 5; // 5.0과 같은 실수도 같은 number 타입이다.
const number2 = 2.8; // TS는 const 키워드로 선언한 변수의 타입을 추론하지 않는다.
// 왜냐하면 상수는 한 번 특정 타입의 값이 할당되면 변하지 않기 때문에 추론할 필요가 없다.
const printResult = true;
let resultPhrase = "Result is ";
let number3: number = 1;
// resultPhrase = 3;

const result = add(number1, number2, printResult, resultPhrase);

export {};
