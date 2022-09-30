const person: object = {
  // person이라는 객체의 타입으로 object라고 명시하면 TS는 이 객체의 속성에는 어떤 타입(Any Type)이나 들어갈 수 있는 객체로 이해한다.
  name: "Jhon",
  age: 30,
};
console.log(person.name); // Jhon
person.name = 1;
console.log(person.name); // 1
// object라고 지정하면 TS는 해당 객체의 속성에는 어떤 타입이나 들어갈 수 있는 것으로 이해하기 때문에
// string 타입의 값을 대입했던 name에 number 타입의 값인 1을 대입해도 에러가 발생하지 않는다.
// 즉, 기존의 JS와 동일하게 동작한 것과 같다.

const person: {
  // person이라는 객체의 타입으로 {}라고 명시하면 object(Any Type)라고 지정한 것과 동일하지만
  // {} 내부에 각 속성의 타입을 명시적으로 지정하면 TS는 해당 속성의 타입을 지정된 타입으로 이해한다.
  name: string;
  age: number;
} = {
  name: "Jhon",
  age: 30,
};
console.log(person.name); // Jhon
person.name = 1;
console.log(person.name); // 1
// Type 'number' is not assignable to type 'string'. 에러가 발생한다.
// 각 속성의 타입을 명시적으로 지정했기 때문에 string 타입으로 지정된 name에 number 타입의 1이라는 값을 넣으려고 하면 에러가 발생하는 것이다.

const person = {
  // 기존 JS에서와 동일하게 객체 생성
  name: "Jhon",
  age: 30,
};
console.log(person.name); // Jhon
person.name = 1;
console.log(person.name); // 1
// Type 'number' is not assignable to type 'string'. 에러가 발생한다.
// TS의 타입 추론 기능에 의해 TS에서는 name의 타입을 string으로 추론하고 있기 때문에 위에서 명시적으로 타입을 지정한 것과 동일하게 에러를 발생시킨다.
