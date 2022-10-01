// 유니언 타입(Union Type)
// 유니언 타입을 사용하면 함수의 매개변수의 타입을 보다 유연하게 사용할 수 있다.

const combine = (input1: number | string, input2: number | string) => {
  // 위처럼 함수의 인자의 타입을 여러 타입이 대입될 수 있도록 지정할 수 있는데 이 것을 유니언 타입(Union Type)이라고 한다.
  // 유니언 타입을 사용하면 두 개 이상 여러 개의 타입을 허용할 수 있다.
  const result = input1 + input2; // 하지만 이렇게 되면 input1 + input2에 빨간 줄이 생기며 아래와 같은 에러가 발생한다.
  // Operator '+' cannot be applied to types 'string | number' and 'string | number'.ts(2365)
  // 에러의 내용은 string | number와 같은 유니언 타입에 + 연산자를 사용할 수 없다는 내용인데,
  // 에러가 발생하는 이유는 TS는 여러 개의 타입이 허용되는 유니언 타입에 어떤 타입이 올지 몰라 연산자를 사용할 수 없는 타입이 올 수 있다고 이해하기 때문이다.
  return result;
};
// 위와 같은 에러를 해결하는 방법은 아래 처럼 if문으로 분기하는 것이다.

const combine = (input1: number | string, input2: number | string) => {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
};

const combineAges = combine(30, 26);
console.log(combineAges);

const combineNames = combine("Max", "Anna");
console.log(combineNames);
