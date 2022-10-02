// 리터럴 타입(Literal Type)

// 예제 1(일반 타입)
const combine = (
  input1: number | string,
  input2: number | string,
  resultConversion: string // 이렇게 해도 resultConversion에는 'as-number'와 'as-text'를 모두 받을 수 있다.
  // ! 하지만 이 경우엔 오타가 들어올 경우 컴파일 단계(코드 작성 단계)에서는 오타 여부를 알 수 없고 프로그램이 실행된 뒤에야 알 수 있다는 것이 문제이다.
) => {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  )
    result = +input1 + +input2;
  else result = input1.toString() + input2.toString();

  // if (resultConversion === "as-number") return +result;
  // else result.toString();
  return result;
};

// 예제 2(리터럴 타입)
// 리터럴(Literal)이란 '정확한'이라는 의미를 가지고 있다.
// 즉, 값을 정확히 명시하는 것이 리터럴 타입이다.
const combine = (
  input1: number | string,
  input2: number | string,
  resultConversion: "as-text" // 이렇게 들어올 값을 정확히 명시하여 이 값만을 받도록 하는 것이 리터럴 타입이다.
  // 이 경우 'as-text'라는 값 외에 다른 값이 오면 에러가 발생한다.(틀린 값 또는 오타를 방지할 수 있다.)
) => {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  )
    result = +input1 + +input2;
  else result = input1.toString() + input2.toString();

  // if (resultConversion === "as-number") return +result;
  // else result.toString();
  return result;
};

// 예제 3(리터럴 타입 + 유니언 타입)
// resultConversion에는 숫자 타입의 반환 값일 경우 'as-number', 텍스트 타입의 반환 값일 경우 'as-text'라는 값을 받아야 한다.
// 하지만 그냥 리터럴 타입만을 사용하면 한 가지의 값만 지정할 수 있기 때문에 이 작업이 불가능하다.
// 이럴 때에는 리터럴 타입으로 정확한 값을 명시하면서 유니온 타입과 결합해 여러 가지의 리터럴 타입을 지정할 수 있다.
const combine = (
  input1: number | string,
  input2: number | string,
  resultConversion: "as-text" | "as-number" // 이렇게 하면 resultConversion은 'as-text'와 'as-number' 모두 인자로 받을 수 있다.
  // 그리고 오타를 방지하고 틀린 값이 오는 것도 방지할 수 있다.
) => {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  )
    result = +input1 + +input2;
  else result = input1.toString() + input2.toString();

  // if (resultConversion === "as-number") return +result;
  // else result.toString();
  return result;
};

const combineAges = combine(30, 26, "as-number");
console.log(combineAges);

const combineStringAges = combine("30", "26", "as-number");
console.log(combineStringAges);

const combineNames = combine("Max", "Anna", "as-text");
console.log(combineNames);
