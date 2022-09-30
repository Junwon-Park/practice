// 튜플(Tuple)은 배열의 길이와 요소의 타입을 모두 알고있고 그 것이 고정된 경우에 일반 배열보다 더 명확하게 사용할 수 있다.
const person: {
  // 아래에서 role이라는 속성은 튜플(Tuple) 타입의 속성인데 이를 지정하기 위해서 타입을 명시적으로 지정했다.
  // 이렇게 하나라도 명시적으로 지정할 경우에는 모든 속성의 타입을 명시해줘야 한다.
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string, string]; // TS에서는 이렇게 길이와 각 요소의 타입을 고정한 타입을 Tuple이라고 한다.
} = {
  name: "Jhon",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author", "writer"],
};

person.role[1] = 1; // role의 1번째는 String 타입의 요소만 허용하지만  Number 타입의 1을 대입했기 때문에 에러가 발생한다.
person.role[1] = "1"; // 동일한 위치에 String 타입의 "1"을 대입했기 때문에 정상적으로 동작한다.
person.role.push("admin"); // TS에서 튜플은 push를 허용하기 때문에 에러가 발생하지 않고 정상적으로 동작한다.
person.role = [0, "admin"]; // role은 튜플 타입이기 때문에 타입도 고정이지만 길이도 고정이다. 위에서는 길이가 3이기 떄문에 두 개의 요소를 가진 배열을 할당하면 에러가 발생한다.

console.log(person.role);
