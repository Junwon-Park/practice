// 콜백 함수 타입 정의

const add = (n1: number, n2: number) => {
  return n1 + n2;
};

const printResult = (num: number): void => {
  console.log("Result: " + num);
};

printResult(add(5, 12));

// 예제 1(Callback의 반환 타입이 number)
// 이 함수가 받는 인자의 파라미터의 개수와 각 파라미터에는 타입이 지정되어 있다.
// 그 중에는 콜백이 포함되어 있는데, 콜백의 파라미터 개수와 타입 그리고 콜백의 반환 값의 타입이 지정되어 있다.
// ! 절대 인자의 타입과 개수, 그리고 반환 값의 타입은 지정한 것과 다를 수 없다.(반드시 동일해야 한다.)
const addAndHandler = (n1: number, n2: number, cb: (num: number) => number) => {
  const result = n1 + n2;
  return cb(result);
};
const resultValue = addAndHandler(10, 60, (num) => {
  console.log(num);
  return num;
});
console.log(resultValue);

// 예제 2(Callback의 반환 타입이 string)
// 예제 1에서와 동일한 내용이다.
const addAndHandler = (n1: number, n2: number, cb: (num: number) => string) => {
  const result = n1 + n2;
  return cb(result);
};
const resultValue = addAndHandler(10, 60, (num) => {
  console.log(num);
  return num.toString();
});
console.log(resultValue);

// 예제 3(Callback의 반환 타입이 void)
// 이 예제의 콜백은 반환 값이 없는 void 타입이다.
// 하지만 아래 함수를 호출하는 부분에서 해당 콜백은 어떤 값을 반환하고 있다.
// 그리고 addAndHandler 함수에서 그 콜백에서 반환한 값을 반환하고 있다.
// ! 즉, TS에서 콜백의 반환 타입이 void일 때, 반환 값이 존재해도 크게 관여하지 않기 때문에 에러를 발생시키지 않는다.
// ! 콜백의 반환 값 보다는 인자의 개수와 타입, 그리고 반환 값의 유무가 아닌 반환 값의 타입이 중요하다.
const addAndHandler = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2;
  return cb(result);
};
const resultValue = addAndHandler(10, 60, (num) => {
  console.log(num);
  return num;
});
console.log(resultValue);
