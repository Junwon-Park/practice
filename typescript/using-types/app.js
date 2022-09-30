// 열거형(Enum)
var Role;
(function (Role) {
    Role[Role["admin"] = 0] = "admin";
    Role[Role["read_only"] = 1] = "read_only";
    Role[Role["author"] = 2] = "author";
})(Role || (Role = {}));
// enum Role { // 첫 번째 요소의 값을 Number 타입의 값을 할당하면 그다음 나머지 요소들의 값도 순서대로 1씩 증가한 값이 자동으로 할당된다.
//   admin = 5,
//   read_only,
//   author,
// }
// enum Role {
//   // 첫 요소에 String 타입을 할당하면 그 다음 나머지 요소에도 특정 값을 할당해줘야 한다.
//   // 그렇지 않으면 나머지 값들은 undefined가 할당된다.
//   admin = "ADMIN",
//   read_only,
//   author,
// }
// enum Role {
//   admin = "ADMIN",
//   read_only = 100,
//   author = "Jhon",
// }
var person = {
    name: "Jhon",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.author
};
console.log(person.role);
