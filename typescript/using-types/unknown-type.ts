// unknown 타입

let userInput: unknown;
let userName: string;

// 예제 1(타입 검사 없이 unknown 타입의 변수에 할당)
// unknown 타입의 userInput에 string 타입의 "Max"를 할당한 후 string 타입의 userName에 할당
// unknown 타입은 any와 동일하게 어떤 타입이든 할당이 가능한 타입이다.
// 하지만 결과는 Type 'unknown' is not assignable to type 'string'.에러 발생
// 이 에러는 위에서 변수의 타입을 unknown -> any로 수정하면 사라진다.
// unknown은 any와 동일하게 모든 타입을 할당할 수 있지만 any보다 제한적이다.
userInput = 5;
userInput = "Max";
userName = userInput;

// 예제 2(타입 검사 후 unknown 타입의 변수에 할당)
// 해결 방법은 if문으로 현재 unknown 타입의 변수의 추론된 타입을 검사하여 동일한 타입의 값을 할당하는 것이다.
// userInput에는 현재 "Max"라는 string 타입의 값이 할당되어 있기 때문에 TS는 userInput이라는 unknown 타입의 변수는 현재 string 타입이라고 추론하고 있다.
// 이 때, if문으로 엄격하게 추론하는 타입을 검사하고 원하는 타입과 동일하다면 해당 값을 할당할 수 있도록 한다.
// any와 동일하게 어떤 타입이던 값을 할당할 수 있지만 값을 할당할 때 그냥 할당하는 것이 아니라 if문으로 타입을 엄격하게 검사한 후 동일한 타입의 값을 할당할 수 있도록 한다는 점에서 차이점이 있다.
userInput = 5;
userInput = "Max";
if (typeof userInput === "string") userName = userInput;

// 예제 3(number 타입의 값 할당)
// 현재 userInput의 값이 숫자 5이므로 TS는 해당 변수의 타입을 number로 추론하고 있다.
// 마찬가지로 if문을 사용해서 타입을 엄격하게 검사한 후 동일한 타입의 값을 할당할 수 있다.
let userName: number;

userInput = "Max";
userInput = 5;
if (typeof userInput === "number") userName = userInput;
