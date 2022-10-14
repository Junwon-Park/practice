// 타입 알리어스(Type Alias, 타입 별칭) -> 사용자 지정 타입
// 타입 알리어스를 사용하면 더 가독성 좋은 코드를 작성할 수 있고, 별칭을 변수 처럼 작성하기 때문에 변수 처럼 재사용 할 수 있다.

type Combinable = number | string; // TS에서는 타입 알리어스를 사용하기 위한 type 키워드를 지원한다.
// 그냥 number 타입이거나 그냥 string 타입이었다면 타입 알리어스를 사용할 필요가 없다.
// 위 처럼 유니온 타입을 사용하는 경우 type 키워드를 사용하여 둘 이상의 타입을 가진 유티온 타입을 Combinable이라는 별칭으로 사용할 수 있다.
type ConversionDexcriptor = "as-number" | "as-text";
// 위 처럼 리터럴 타입의 유니온 타입에도 동일하게 타입 알리어스를 사용할 수 있다.
// 여러 타입을 지정하고 그 것을 재사용하는 것은 귀찮은 작업이다.
// ! 위 처럼 여러 타입들을 하나의 별칭으로 지정해서 변수 처럼 재사용하는 것이 더 편리하다. 이 것이 타입 별칭의 장점이다.

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

  return result;
};

const combineAges = combine(30, 26, "as-number");
console.log(combineAges);

const combineStringAges = combine("30", "26", "as-number");
console.log(combineStringAges);

const combineNames = combine("Max", "Anna", "as-text");
console.log(combineNames);

// 별칭에는 객체 타입도 지정할 수 있다.
type User = { name: string; age: number };
const u1: User = { name: "Max", age: 30 }; // this works!

type Product = { title: string; price: number };
const p1: Product = { title: "A Book", price: 12.99, isListed: true };
// Product 별칭은 각 속성에 타입이 지정된 객체가 지정되어 있고 그 속성 중에는 isListed라는 속성이 존재하지 않기 때문에 에러가 발생한다.

// 별칭을 지정할 때 객체와 문자열을 유니온 타입으로 지정할 수 있다.
type User = { name: string } | string; // 두 타입을 유니온 타입으로 User라는 별칭으로 지정.
let u1: User = { name: "Max" }; // User라는 별칭에 객체 타입 지정 후 u1이라는 객체 생성.
u1 = "Michael"; // 위에서 객체 타입을 할당했던 u1 객체에 "Michael"이라는 문자열 할당.
