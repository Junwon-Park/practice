const add = (n1: number, n2: number) => {
  return n1 + n2;
};

const printResult = (num: number): void => {
  console.log("Result: " + num);
};

printResult(add(5, 12));

// 예제 1(JS의 기본적인 변수 선언 및 함수, 원시타입의 값 할당)
let combineValues; // 일반적인 JS의 변수 선언
combineValues = add; // 함수를 할당
combineValues = 5; // 숫자 5를 재할당
console.log(combineValues(8, 8)); // TS에서는 최종적으로 combineValues라는 변수에 할당된 값이 5라는 number 타입의 값이기 때문에 해당 변수의 타입을 number라고 추론한다.
// 그렇기 때문에 빨간줄이 생긴다.
// 기존의 TS는 이런 상황을 감지하지 못해 빨간줄이 생기지 않아 런타임 때 에러가 발생했다고 한다.

// 예제 2(변수에 할당할 값의 타입을 Function으로 지정)
// Function이라는 타입은 TS에서 지원하는 함수 타입이다.
// Function 타입이 지정된 변수에는 함수가 할당되어야 한다.
let combineValues: Function; // combineValues 변수에 함수 타입 지정
combineValues = add; // add는 함수이기 때문에 Function 타입인 combineValues 변수에 할당할 수 있다.
// combineValues = 5; // 5는 number 타입이기 때문에 당연히 빨간 줄이 생기고 실행하면 에러가 발생한다.
console.log(combineValues(8, 8));

// 예제 3(void 함수 할당)
// 그냥 Function 타입으로 지정했기 때문에 함수인 printResult도 정상적으로 할당된다.
// 하지만 printResult 함수는 number 타입의 인자를 하나만 받고 반환 값이 없는 void 타입 함수이다.
// 그래서 combineValues(8, 8)이라고 호출한 부분에 에러가 발생해야 하지만 TS는 combineValues에 지정된 타입이 Function이기 때문에 문제가 없다고 판단해서 빨간줄이 생기지 않는다.
// ! 하지만 런타임 때 에러가 발생한다. 왜냐하면 그냥 Function이라고 지정한 경우 TS는 any 타입의 Function이라고 이해하기 때문이다.
// ! Function이라고 지정하면 어떤 타입의 함수라도 할당될 수 있다.
let combineValues: Function;
combineValues = add;
combineValues = printResult;
console.log(combineValues(8, 8));

// 예제 4(함수를 할당할 변수에 할당할 함수의 매개변수와 반환 값의 타입을 지정한 함수 타입 지정)
// combineValues에 할당할 함수는 number 타입의 두 매개 변수를 가지고 number 타입의 값을 반환하는 함수이다.
// 그 것을 let Variable: (Arguments: Type) => Type 이런 형식으로 지정한다.
// 이렇게 지정하면 아무런 값도 반환하지 않는 함수(void)인 printResult를 할당한 부분에 빨간 줄이 생긴다.
let combineValues: (a: number, b: number) => number;
combineValues = add; // add 함수는 위에 지정한 함수 타입과 일치하기 때문에 정상 동작한다.
combineValues = printResult; // printResult는 void 함수이기 때문에 만약 printResult 함수를 할당하려고 한다면 let Variable: (a: number) => void라고 함수의 타입을 지정해야 한다.
console.log(combineValues(8, 8));
