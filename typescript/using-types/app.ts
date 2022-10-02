// 함수 반환 타입 및 무효

// 예제 1
// add 함수 위에 마우스 커서를 올리면 가장 끝에 => number라고 되어 있는 부분이 반환 타입이다.
// add 함수의 반환 타입은 number 타입인 두 매개 변수 n1과 n2를 더한 number 타입의 값이다.
// TS는 add 함수가 number 타입의 두 매개 변수를 받기 때문에 반환 타입 또한 number 타입일 것이라고 추론하는 것이다.
const add = (n1: number, n2: number) => {
  return n1 + n2;
};

// 예제 2
// 만약 아래 처럼 반환 값에 toString()을 사용해 문자열을 반환하도록 한다면 TS는 이 것 또한 정확히 추론하여 반환 값이 string이라고 이해한다.
const add = (n1: number, n2: number) => {
  return n1.toString() + n2.toString();
};

// 예제 3(함수 반환 타입 명시)
// 함수의 매개 변수 뒤에 ": Type"이라고 이 함수의 반환 값의 타입을 정확히 명시할 수 있다.
// 여기에서 add 함수의 반환 값의 타입은 number인데 return 문에는 문자열을 반환하고 있기 때문에 return문에 에러가 발생한다.
const add = (n1: number, n2: number): number => {
  return n1.toString() + n2.toString();
};

// 예제 4(함수 반환 타입 void, 반환 값 없음)
// add 함수의 반환 타입에 void라고 명시되어 있다.
// 그 이유는 add 함수는 아무 것도 반환하지 않고 console.log()로 출력만 할 뿐이다.
// 이렇게 아무 것도 반환하지 않는 함수의 타입을 void라고 한다.
const add = (n1: number, n2: number): void => {
  console.log(n1.toString() + n2.toString());
};

// ! 하지만 TS에서는 함수의 모든 반환 타입을 정확히 추론하기 때문에 꼭 필요한 상황이 아니라면 궂이 명시할 필요는 없다.
// void도 마찬가지로 TS는 정확히 추론한다.
