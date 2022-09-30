var person = {
    name: "Jhon",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: [2, "author", "writer"]
};
// person.role[1] = 1; // role의 1번째는 String 타입의 요소만 허용하지만  Number 타입의 1을 대입했기 때문에 에러가 발생한다.
// person.role[1] = "1"; // 동일한 위치에 String 타입의 "1"을 대입했기 때문에 정상적으로 동작한다.
// person.role.push("admin"); // TS에서 튜플은 push를 허용하기 때문에 에러가 발생하지 않고 정상적으로 동작한다.
person.role = [0, "admin", "user"];
console.log(person.role);
