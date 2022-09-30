const person: object = {
  name: "Jhon",
  age: 30,
  hobbies: ["Sports", "Cooking"],
};

let favoriteActivities: string[]; // favoriteActivities라는 변수는 String 타입을 요소로 갖는 배열을 할당할 변수라는 것을 TS에게 알려주는 것이다.
favoriteActivities = "Sports"; // String 타입을 요소로 갖는 배열이 아닌 그냥 String 타입의 값이기 때문에 에러가 발생한다.
favoriteActivities = ["Sports"]; // String 타입을 요소로 갖는 배열이기 때문에 에러가 발생하지 않는다.
favoriteActivities = ["Sports", 1]; // 배열의 요소로 Number 타입인 1이 요소로 있기 때문에 에러가 발생한다.
// 배열의 요소의 타입을 혼합하여 사용하고 싶다면 타입을 지정할 때, any[]라고 지정하면 타입을 혼합해서 요소로 가질 수 있게 된다.
let favoriteActivitiesMixed: any[];
favoriteActivitiesMixed = ["Sports", 1]; // any[]로 지정하니까 에러가 발생하지 않는다.
// 하지만 any[]라는 타입을 지정하는 것은 TS를 사용하는 장점을 무의미하게 할 수 있기 때문에 되도록 사용하지 않는 것이 좋다.
// any[]는 꼭 필요할 때만 사용한다.

let favoriteActivitiesStr: string[] = ["Sports", "Cooking"];
