// 타입 알리어스(Type Alias, 타입 별칭)
// 타입 알리어스를 사용하면 더 가독성 좋은 코드를 작성할 수 있고, 별칭을 변수 처럼 작성하기 때문에 변수 처럼 재사용 할 수 있다.

type Combinable = number | string; // TS에서는 타입 알리어스를 사용하기 위한 type 키워드를 지원한다.
// 그냥 number 타입이거나 그냥 string 타입이었다면 타입 알리어스를 사용할 필요가 없다.
// 위 처럼 유니온 타입을 사용하는 경우 type 키워드를 사용하여 둘 이상의 타입을 가진 유티온 타입을 Combinable이라는 별칭으로 사용할 수 있다.
type ConversionDexcriptor = "as-number" | "as-text";
// 위 처럼 리터럴 타입의 유니온 타입에도 동일하게 타입 알리어스를 사용할 수 있다.

const combine = (
  input1: Combinable, // 기존의 유니온 타입(number | string)을 Combinable이라는 별칭으로 대체했다.
  input2: Combinable,
  resultConversion: ConversionDexcriptor // 기존의 리터럴 타입의 유니온 타입인 'as-number' | 'as-text'를 ConversionDexcriptor라는 별칭으로 대체했다.
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
