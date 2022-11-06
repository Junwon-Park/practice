interface User {
  name: string;
  age: number;
  gender?: string; // Optional
}

type User2 {
    name: string;
    age: number;
    gender?: string; // Optional
  }

let user: User = {
  name: "xx",
  age: 30,
};

console.log(user.age);
user.age = 10;
console.log(user.age);
